import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';

export default class Registration extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token==null){
            loggedIn=false;
        }
        this.state = {
            loggedIn:loggedIn
        }
    }
    
    render() {
        if(this.state.loggedIn==false){
            this.props.history.push('/student/login');
            return (
                <div>
                    <Login/>
                </div>
            );
        }
        return (
            <div>
                <NavbarClass/>
                Course Registration Page
            </div>
        )
    }
}