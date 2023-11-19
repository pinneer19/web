import React, {useContext} from 'react';
import '../static/Catalog.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ControlBar = observer(() => {
    const {service} = useContext(Context)
    return (
        <div className="control-bar">

            <select>
                {service.doctors.map(doctor =>
                    <option key={doctor.id} value="doctorname">{doctor.first_name}</option>
                )}

            </select>

            <input type="text" placeholder="Search" />
            <button className="sort-button">Sort by Price</button>
        </div>
    );
});

export default ControlBar;