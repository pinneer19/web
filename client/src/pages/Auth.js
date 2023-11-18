import React from 'react';
import '../static/Auth.css'
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/constants";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <div className="container">
            <div className="card">
                <h2>{isLogin ? 'Login' : 'Registration'}</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <div className="submit-group">
                        {isLogin ?
                            <a href={REGISTRATION_ROUTE}>Don't have an account?</a>
                            :
                            <a href={LOGIN_ROUTE}>Already have an account?</a>
                        }
                        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;