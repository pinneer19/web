import React, {useContext, useState} from 'react';
import {Context} from "../index";
import '../static/User.css'
import Modal from "../components/modals/Modal";

const User = () => {
    // <!--  <form method="post" enctype="multipart/form-data">  -->
    const {service} = useContext(Context)
    const [editModalActive, setEditModalActive] = useState(false);
    const [createModalActive, setCreateModalActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [selectedService, updateSelectedService] = useState({})
    return (
        <div className="service-container">

            <button className="name-create" onClick={() => setCreateModalActive(true)}>Create</button>
            <ul>
                {service.services.map((service) => (
                    <li key={service.id} className="service-item">
                        <div className="service-user-details">
                            <img
                                //src={service.img}
                                src={process.env.PUBLIC_URL + '/logo192.png'}
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
                            <button className="edit-button" onClick={function() {
                                updateSelectedService(service);
                                setEditModalActive(true);
                            }}>Edit
                            </button>
                            <button className="delete-button" onClick={() => setDeleteModalActive(true)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal active={editModalActive} setActive={setEditModalActive}>
                <div className="create-modal-content">
                    <h3>Edit Service</h3>
                    <form>
                        <input placeholder="Name" type="text" value={selectedService.name} name="name"/>
                        <input placeholder="Description" type="text" value={selectedService.description} name="description"/>
                        <input placeholder="Doctor" type="text" value={selectedService.doctor} name="doctor"/>
                        <input placeholder="Image" type="file" accept="image/*" name="image"/>
                        <input placeholder="Price" type="number" value={selectedService.price} name="price"/>
                        <div className="modal-buttons">
                            <button className="cancel-modal-button" onClick={() => {
                                updateSelectedService({})
                                setCreateModalActive(false);
                            }}>
                                Cancel
                            </button>
                            <button className="confirm-modal-button">
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
                        <input placeholder="Name" type="text" name="name"/>
                        <input placeholder="Description" type="text" name="description"/>
                        <input placeholder="Doctor" type="text" name="doctor"/>
                        <input placeholder="Image" type="file" accept="image/*" name="image"/>
                        <input placeholder="Price" type="number" name="price"/>
                        <div className="modal-buttons">
                            <button className="cancel-modal-button" onClick={() => setCreateModalActive(false)}>
                                Cancel
                            </button>
                            <button className="confirm-modal-button">
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
                        <button className="confirm-modal-button">
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>


        </div>
    );
};

export default User;