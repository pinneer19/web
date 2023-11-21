import React from 'react';
import '../static/Catalog.css'
import {useNavigate} from "react-router-dom";
import {SERVICE_ROUTE} from "../utils/constants";


const ServiceItem = ({service}) => {
    const navigate = useNavigate()
    return (
        <div className="card" onClick={() => navigate(SERVICE_ROUTE + `/${service._id}`)}>
            <img
                src={process.env.PUBLIC_URL + '/logo192.png'}
                alt={service.name}
                className="card-image"
            />
            <div className="card-info">
                <h3>{service.name}</h3>
                <p>{service.price} USD</p>
            </div>
        </div>
    );
};

export default ServiceItem;