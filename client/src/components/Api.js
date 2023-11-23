import React, {useEffect, useState} from 'react';
import {getClientGeo, getDog} from "../http/ipApi";
import '../static/Api.css'
import Loader from "./Loader";
import {Context} from "../index";

class Api extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            response: {},
            dogLink: ''
        };
    }

    componentDidMount() {
        getClientGeo().then(res => {
            const response = res
            response.country = `https://flagsapi.com/${response.country}/flat/64.png`
            this.setState({response})

        }).catch(e => console.log(e.message))
        getDog().then(res => {
            this.setState({dogLink: res.data.message})
        }).catch(e => console.log(e.message))
    }

    handleClick = () => {
        alert('Event handler!')
    };

    render() {
        const {response, dogLink} = this.state
        return (
            <div>
                <div className="header-props">
                    <h2>Hello from props, {this.props.name}!</h2>
                    <button onClick={this.handleClick}>Click</button>
                </div>
                <div className="api-container">
                    <h2 className="api-date">{response.formattedDate + ' UTC' + response.offset}</h2>
                    <img className="api-flag" src={response.country} alt="Country Flag"/>
                    <img className="doggy" src={dogLink} alt="Doggy"/>
                </div>

            </div>
        );
    };
}
Api.defaultProps = {name: 'user'}
export default Api;