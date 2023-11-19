import React from 'react';
import '../static/Catalog.css'
const ServiceItem = ({service}) => {
    return (
        <div className="card">
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