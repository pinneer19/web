import {$host} from './index'

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
    return response;
}

export const logout = async (email, password) => {
    const response = await $host.post(
        'api/user/logout'
    );
    return response;
}