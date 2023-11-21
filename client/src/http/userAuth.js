import {$host, $hostFacebook} from './index'

export const registration = async (firstName, lastName, email, phoneNumber, password) => {
    const response = await $host.post(
        'api/user/registration',
        {firstName, lastName, email, phoneNumber, password}
    );
    return response;
}

export const login = async (email, password) => {
    const response = await $host.post(
        'api/user/login',
        {email, password}
    );
    //console.log(await check())
    return response;
}

export const logout = async (email, password) => {
    const response = await $host.post(
        'api/user/logout'
    );
    return response;
}

export const check = async () => {
    return await $host.get('api/user/auth')
}

export const googleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_self")
}

export const facebookAuth = () => {
    window.open("http://localhost:5000/auth/facebook", "_self")
}

export const githubAuth = () => {
    window.open("http://localhost:5000/auth/github", "_self")
}

export const getUser = async () => {
    return await $host.get('api/user');
}