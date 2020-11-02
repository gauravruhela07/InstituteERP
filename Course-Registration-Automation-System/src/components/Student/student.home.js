import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';

export default class StudentHome extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true;
        if(token==null) {
            loggedIn = false;
        }
        this.state = {
             loggedIn
        }
    }
    
    
    render() {
        if(this.state.loggedIn === false){
            console.log(this.state);
            return <Redirect to='/student/login' />
        }
        return (
            <div>
                <h1>This is student Home</h1>
                <Link to='/student/logout'>Logout</Link>
            </div>
        )
    }
}
