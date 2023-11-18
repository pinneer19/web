import React, {useContext} from 'react';
import {Context} from "../index";
import '../static/NavBar.css';
import {NavLink} from "react-router-dom";
import {CATALOG_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (<nav className="navbar">
            <div className="brand">
                <a href="/"><img src={process.env.PUBLIC_URL + '/logo192.png'} height={60} alt="React Image"/>Medical
                    Center</a>
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            {user.isAuth ? (<div className="button-group">
                <button className="button" onClick={() => user.setIsAuth(false)}>
                    Logout
                </button>
                <a href="/user-cabinet" className="button">
                    User Cabinet
                </a>
            </div>) : (<div className="button-group">
                    <button className="button" onClick={() => user.setIsAuth(true)}>
                        Login
                    </button>
                    <button className="button">
                        Register
                    </button>
                </div>)}
        </nav>);
});

export default NavBar;