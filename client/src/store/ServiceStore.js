import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._services = [];
        this._doctors = [];
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
    updateService(id) {
        const indexToDelete = this._services.findIndex(item => item._id === id);
        if (indexToDelete !== -1) {
            this._services.splice(indexToDelete, 1);
        } else {
            console.log('Item not found!');
        }
    }
}