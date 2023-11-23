import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import '../static/User.css'
import Modal from "../components/modals/Modal";
import {addService, deleteService, editService, fetchDoctors, fetchServices} from "../http/catalogAPI";
import {observer} from "mobx-react-lite";

const User = observer(() => {
    const {service} = useContext(Context)
    const [editModalActive, setEditModalActive] = useState(false);
    const [createModalActive, setCreateModalActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [deletedService, setDeletedService] = useState(0)
    const [selectedService, setSelectedService] = useState({
        name: '',
        description: '',
        doctor: '',
        image: null,
        price: 0
    });
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        doctor: '',
        image: null,
        price: '',
    });

    const validateForm = () => {
        const errors = {};

        // Validate the name
        if (!selectedService.name) {
            errors.name = 'Name is required';
        }

        // Validate the description
        if (!selectedService.description) {
            errors.description = 'Description is required';
        }

        // Validate the doctor
        if (!selectedService.doctor) {
            errors.doctor = 'Doctor selection is required';
        }

        // Validate the image
        if (!selectedService.image) {
            errors.image = 'Image is required';
        }

        // Validate the price
        if (!selectedService.price || isNaN(selectedService.price)) {
            errors.price = 'Price must be a valid number';
        }

        setValidationErrors(errors);

        // Return true if there are no errors, otherwise false
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {
        fetchDoctors().then((response) => {
            service.setDoctors(response.data)
        });
        fetchServices().then((response) => {
            service.setServices(response.data.services)
        })
    }, []);

    const handleChange = (event) => {
        const {name, value, type, files} = event.target;
        const newValue = type === 'file' ? files[0] : value;
        setSelectedService(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };
    const onClickDelete = () => {
        deleteService(deletedService)
            .then((_) => {
                service.deleteService(deletedService);
                setDeleteModalActive(false);
            })
            .catch(e => console.log(e.message))
    }

    const onClickAdd = () => {
        const isValid = validateForm();

        if (!isValid) {
            alert("Check form input!")
            return;
        }
        addService(selectedService)
            .then(res => {
                service.addService(res.data.service)
                setCreateModalActive(false)
            })
            .catch(e => console.log(e.message))
    }

    const onClickEdit = () => {
        const isValid = validateForm();

        if (!isValid) {
            alert("Check form input!")
            return;
        }
        editService(selectedService, deletedService)
            .then(res => {
                service.updateService(res.data.updatedService, deletedService)
                setEditModalActive(false)
            })
            .catch(e => console.log(e.message))
    }

    return (
        <div className="service-container">

            <button className="name-create" onClick={() => setCreateModalActive(true)}>Create</button>
            <ul>
                {service.services.map((service) => (
                    <li key={service.id} className="service-item">
                        <div className="service-user-details">
                            <img
                                src={process.env.REACT_APP_API_URL + service.img}
                                alt={service.name}
                                className="service-user-image"
                            />
                            <div className="service-user-info">
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <p>Price: ${service.price}</p>
                            </div>
                        </div>
                        <div className="service-buttons">
                            <button className="edit-button" onClick={function () {
                                setEditModalActive(true);
                                setSelectedService(service);
                                setDeletedService(service._id)
                            }}>Edit
                            </button>
                            <button className="delete-button" onClick={() => {
                                setDeleteModalActive(true);
                                setDeletedService(service._id)
                            }}>Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal active={editModalActive} setActive={setEditModalActive}>
                <div className="create-modal-content">
                    <h3>Edit Service</h3>
                    <form>
                        <input placeholder="Name" type="text" value={selectedService.name} name="name"
                               onChange={handleChange}/>
                        <input placeholder="Description" type="text" value={selectedService.description}
                               name="description" onChange={handleChange}/>
                        <select className="select-doctor" name="doctor" onChange={handleChange}>
                            <option value=''>Select doctor</option>
                            {service.doctors.map((doctor) =>
                                <option key={doctor.id} value={doctor._id}>{doctor.firstName}</option>
                            )}
                        </select>
                        <input placeholder="Image" type="file" accept="image/*" name="image" onChange={handleChange}/>
                        <input placeholder="Price" type="number" value={selectedService.price} name="price"
                               onChange={handleChange}/>
                        <div className="modal-buttons">
                            <div className="cancel-modal-button" onClick={() => {
                                setSelectedService({})
                                setEditModalActive(false);
                            }}>
                                Cancel
                            </div>
                            <button type="button" className="confirm-modal-button" onClick={() => {
                                onClickEdit()
                            }}>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal active={createModalActive} setActive={setCreateModalActive}>
                <div className="create-modal-content">
                    <h3>Create New Service</h3>
                    <form>
                        <input placeholder="Name" type="text" name="name" onChange={handleChange}/>
                        <input placeholder="Description" type="text" name="description" onChange={handleChange}/>
                        <select className="select-doctor" name="doctor" onChange={handleChange}>
                            <option value=''>Select doctor</option>
                            {service.doctors.map((doctor) =>
                                <option key={doctor.id} value={doctor._id}>{doctor.firstName}</option>
                            )}
                        </select>
                        <input placeholder="Image" type="file" accept="image/*" name="image" onChange={handleChange}/>
                        <input placeholder="Price" type="number" name="price" onChange={handleChange}/>
                        <div className="modal-buttons">
                            <div className="cancel-modal-button" onClick={() => setCreateModalActive(false)}>
                                Cancel
                            </div>
                            <button type="button" className="confirm-modal-button" onClick={() => {
                                onClickAdd()
                            }}>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <div className="delete-modal-content">
                    <p>Are you sure you want to delete this service?</p>
                    <div className="modal-buttons">
                        <button className="cancel-modal-button" onClick={() => setDeleteModalActive(false)}>
                            Cancel
                        </button>
                        <button className="confirm-modal-button" onClick={() => onClickDelete()}>
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>


        </div>
    );
});

export default User;