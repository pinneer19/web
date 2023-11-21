import React, {useEffect, useState} from 'react';
import '../static/ServicePage.css'
import {observer} from "mobx-react-lite";
import {fetchService} from "../http/catalogAPI";
import {useParams} from 'react-router-dom'

const ServicePage = observer(() => {
    const [service, setService] = useState({})
    const [doctor, setDoctor] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetchService(id).then((response) => {
            setService(response.service)
            setDoctor(response.doctor)
        })
    }, []);
    return (
        <div className="service-detail">
            <div className="service-image">
                <img src={process.env.REACT_APP_API_URL + service.img} alt={service.name} />
            </div>
            <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>Doctor: {doctor.firstName + ' ' + doctor.lastName + ' ' + doctor.specialization}</p>
                <p>Price: ${service.price}</p>
            </div>
        </div>
    );
});

export default ServicePage;