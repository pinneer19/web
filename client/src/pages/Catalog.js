import React from 'react';


const services = [
    {
        name: 'Service 1',
        description: 'Description for Service 1',
        doctor: 'Doctor 1',
        price: 50,
        img: 'image1.jpg',
    },
    {
        name: 'Service 2',
        description: 'Description for Service 2',
        doctor: 'Doctor 2',
        price: 75,
        img: 'image2.jpg',
    },
    // Add more services as needed
];
const Catalog = () => {
    return (
        <div className="catalog-container">
            {services.map((service, index) => (
                <div key={index} className="card">
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
            ))}
        </div>
    );
};

export default Catalog;