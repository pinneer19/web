import React, {useContext, useEffect, useState} from 'react';
import '../static/Catalog.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDoctors, fetchServices, searchResult} from "../http/catalogAPI";

const ControlBar = observer(({sorted, setSorted, setSelectedDoctor}) => {
    const {service} = useContext(Context)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSort = () => {
        if (sorted === true) {
            setSorted(false); // change to ascending
        } else if (sorted === false) {
            setSorted(null); // change to default
        } else {
            setSorted(true); // change to descending
        }
    };

    useEffect(() => {
        fetchDoctors().then((response) => {
            service.setDoctors(response.data)
        })
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(!searchTerm) {
                fetchServices().then((response) => {
                    service.setServices(response.data.services)
                })
            }
            else {
                searchResult(searchTerm)
                    .then((response) => {
                        service.setServices(response.data.services)
                    })
                    .catch((e) => {
                        console.log(e.message)
                    })
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    return (
        <div className="control-bar">
            <select onChange={(e) => setSelectedDoctor(e.target.value)}>
                <option value=''>Select doctor</option>
                {service.doctors.map((doctor) =>
                    <option key={doctor.id} value={doctor._id}>{doctor.firstName}</option>
                )}
            </select>
            <input type="text" placeholder="Search" autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className="sort-button" onClick={() => handleSort()}>Sort by Price</button>
        </div>
    );
});

export default ControlBar;