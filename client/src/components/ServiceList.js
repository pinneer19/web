import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ServiceItem from "./ServiceItem";
import '../static/Catalog.css'
import {fetchDoctors, fetchServices} from "../http/catalogAPI";

const ServiceList = observer(({sorted, selectedDoctor}) => {
    const {service} = useContext(Context)
    useEffect(() => {
        fetchServices().then((response) => {
            service.setServices(response.data.services)
        })
    }, []);
    const getPreparedServiceList = function () {
        let resultServices;
        if (selectedDoctor === '') {
            resultServices = service.services;
        } else {
            resultServices = service.services.filter((s) => s.doctor === selectedDoctor);
        }
        if (sorted === true) {
            return resultServices.slice().sort((s1, s2) => s1.price - s2.price);
        } else if (sorted === false) {
            return resultServices.slice().sort((s1, s2) => s2.price - s1.price);
        } else {
            return resultServices;
        }
    };
    return (
        <div className="catalog-container">
            {
                getPreparedServiceList().map(service =>
                    <ServiceItem key={service.id} service={service}/>
                )
            }
        </div>
    );
});

export default ServiceList;