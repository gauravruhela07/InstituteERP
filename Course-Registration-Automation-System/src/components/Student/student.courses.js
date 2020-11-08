import React, {Component} from 'react';
import axios from 'axios';

import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';


export default class Courses extends Component{
    constructor(props) {
        super(props)
        let loggedIn = true;
        const token = localStorage.getItem('token');
        if(token==null){
            loggedIn=false;
        }
        this.state = {
            loggedIn : loggedIn,
            courses : []
        }
    }

    componentDidMount() {
        // axios.get()  
    }
    render() {
        if(this.state.logged===false){
            this.props.history('/student/login')
            return (
                <div>
                    <Login/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <NavbarClass/>
                    <br/>
                    <div className="container">
                        <h3>Courses</h3>
                        
                    </div>
                </div>
            )
        }
    }
}