import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ServiceItem from "./ServiceItem";
import '../static/Catalog.css'

const ServiceList = observer(() => {
    const {service} = useContext(Context)
    return (
        <div className="catalog-container">
            {service.services.map(service =>
                <ServiceItem key={service.id} service={service}/>
            )}
        </div>
    );
});

export default ServiceList;