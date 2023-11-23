import {$host} from "./index";
import FormData from "form-data"

export const fetchDoctors = async () => {
    const {data} = await $host.get('api/doctor');
    return data;
}

export const fetchServices = async () => {
    const response = await $host.get('api/service');
    return response;
}

export const fetchService = async (id) => {
    const serviceResponse = await $host.get('api/service/' + id);
    const doctorResponse = await $host.get('api/doctor/' + serviceResponse.data.doctor)
    const serviceData = serviceResponse.data;

    return {service: serviceData, doctor: doctorResponse.data};
}

export const searchResult = async function (input) {
    if (input) {
        return await $host.get('api/service/search/' + input);
    }
}

export const deleteService = async (id) => {
    return await $host.delete('api/service/' + id)
}

export const addService = async (service) => {
    let data = new FormData();
    Object.entries(service).forEach(([key, value]) => {
        data.append(key, value);
    });
    return await $host.post(
        'api/service/',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

export const editService = async (service) => {

    let data = new FormData();
    Object.entries(service).forEach(([key, value]) => {
        data.append(key, value);
    });
    return await $host.put(
        'api/service/',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
}