import React, {useContext, useState} from 'react';
import '../static/Auth.css'
import {useLocation, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/constants";
import {facebookAuth, getUser, githubAuth, googleAuth, login, registration} from "../http/userAuth";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useContext(Context)

    const authClick = async () => {
        try {
            let response;
            if (isLogin) {
                response = await login(email, password)
            } else {
                response = await registration(firstName, lastName, email, phoneNumber, password)
            }
            user.setUser(response.data.user)
            user.setIsAuth(true)
            navigate(CATALOG_ROUTE)
        } catch (e) {
            alert(e.message)
        }
    }

    const googleAuthClick = async () => {
        try {
            googleAuth()
        } catch (e) {
            console.log(e.message)
        }
    }

    const facebookAuthClick = () => {
        try {
            facebookAuth()
        } catch(e) {
            console.log(e.message)
        }
    }

    const githubAuthClick = () => {
        try {
            githubAuth()
        } catch(e) {
            console.log(e.message)
        }
    }

    return (
        <div className="container">
            <div className="auth-card">
                <h2>{isLogin ? 'Login' : 'Registration'}</h2>
                {isLogin ?
                <form>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className="submit-group">
                        <a className="auth-anchor" href={REGISTRATION_ROUTE}>Don't have an account?</a>
                        <button type="button" onClick={authClick}>Login</button>
                    </div>
                    <div className="auth-buttons">
                    <button type="button" className="auth-button" onClick={googleAuthClick}>
                        <span className="google-icon"></span>
                        <span>Sign in with Google</span>
                    </button>
                    <button type="button" className="auth-button" onClick={githubAuthClick}>
                        <span className="github-icon"></span>
                        <span>Sign in with Github</span>
                    </button>
                    {/*<button type="button" className="auth-button" onClick={facebookAuthClick}>*/}
                    {/*    <span className="facebook-icon"></span>*/}
                    {/*    <span>Sign in with Facebook</span>*/}
                    {/*</button>*/}
                    </div>

                </form>
                    :
                    <form>
                        <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="text" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <div className="submit-group">
                            <a className="auth-anchor" href={LOGIN_ROUTE}>Already have an account?</a>
                            <button type="submit" onClick={authClick}>Register</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
});

export default Auth;