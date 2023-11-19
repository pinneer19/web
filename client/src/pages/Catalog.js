import React from 'react';
import '../static/Catalog.css'
import ServiceList from "../components/ServiceList";
import ControlBar from "../components/ControlBar";
const Catalog = () => {
    return (
        <div>
            <ControlBar/>
            <ServiceList/>
        </div>
    );
};

export default Catalog;