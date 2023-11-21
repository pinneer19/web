import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import '../static/NavBar.css';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "../utils/constants";
import {getUser, logout} from "../http/userAuth";
import {set} from "mobx";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const logoutClick = async () => {
        try {
            await logout()
            user.setUser({})
            user.setIsAuth(false)
            navigate(LOGIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    useEffect(() => {
        getUser()
            .then(res => {
                setFirstName(res.data.message.firstName)
            })
            .catch(e => console.log(e.message))
    }, []);
    return (<nav className="navbar">
        <div className="brand">
            <a href="/"><img src={process.env.PUBLIC_URL + '/logo192.png'} height={60}/>Medical
                Center</a>
        </div>
        <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        {user.isAuth ? (<div>
            <button className="button" onClick={() => navigate(USER_ROUTE)}>
                Hello, {firstName}!
            </button>
            <button className="button" onClick={() => logoutClick()}>
                Logout
            </button>
        </div>) : (<div>
            <button className="button" onClick={() => navigate(LOGIN_ROUTE)}>
                Login
            </button>
            <button className="button" onClick={() => navigate(REGISTRATION_ROUTE)}>
                Register
            </button>
        </div>)}
    </nav>);
});

export default NavBar;