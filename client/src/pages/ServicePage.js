import React from 'react';
import '../static/ServicePage.css'
const ServicePage = () => {
    const service = {
        name: 'Service 1',
        description: 'Description for Service 1 Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1Description for Service 1    ',
        doctor: 'Doctor 1',
        price: 50,
        img: 'image1.jpg'
    }
    return (
        <div className="service-detail">
            <div className="service-image">
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt={service.name} />
            </div>
            <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>Doctor: {service.doctor}</p>
                <p>Price: ${service.price}</p>
            </div>
        </div>
    );
};

export default ServicePage;