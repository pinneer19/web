import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._services = [
            {
                name: 'Service 1',
                description: 'Description for Service 1',
                doctor: 'Doctor 1',
                price: 50,
                img: 'image1.jpg'
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 6',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            },
            {
                name: 'Service 2',
                description: 'Description for Service 2',
                doctor: 'Doctor 2',
                price: 75,
                img: 'image2.jpg',
            }
        ];
        this._doctors = [
            {
                first_name: 'firstname1',
                last_name: 'lastname1',
                specialization: 'spec'
            },
            {
                first_name: 'firstnam3',
                last_name: 'lastname451',
                specialization: 'spec'
            },
            {
                first_name: 'firstname2',
                last_name: 'lastname3',
                specialization: 'spec'
            }
            ];
        this._selectedDoctor = {}
        makeAutoObservable(this)
    }
    setServices(services) {
        this._services = services
    }
    get services() {
        return this._services
    }

    setDoctors(doctors) {
        this._doctors = doctors
    }
    get doctors() {
        return this._doctors
    }
    setSelectionDoctor(doctor) {
        this._selectedDoctor = doctor;
        console.log(this._selectedDoctor)
    }
    get SelectionDoctor() {

        return this._selectedDoctor
    }
}