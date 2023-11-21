import React, {useContext, useEffect, useState} from 'react';
import '../static/Catalog.css'
import ServiceList from "../components/ServiceList";
import ControlBar from "../components/ControlBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchDoctors} from "../http/catalogAPI";
const Catalog = observer(() => {
    const [sorted, setSorted] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState('')
    return (
        <div>
            <ControlBar sorted={sorted} setSorted={setSorted} setSelectedDoctor={setSelectedDoctor}/>
            <ServiceList sorted={sorted} selectedDoctor={selectedDoctor}/>
        </div>
    );
});

export default Catalog;