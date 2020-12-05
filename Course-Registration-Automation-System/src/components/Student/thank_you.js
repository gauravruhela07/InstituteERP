import React, {Component} from 'react';

import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';

export default class Thanks extends Component{
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token==null){
            loggedIn = false
        }
        this.state = {
             loggedIn:loggedIn
        }
    }
    render() {
        if(this.state.loggedIn===false){
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
                <div className="container">
                    <h3>Thanks For Registeration!</h3>
                </div>
            </div>
        )
    }
}