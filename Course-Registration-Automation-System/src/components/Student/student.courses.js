import React, {Component} from 'react';
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
            loggedIn : loggedIn
        }
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
            
        }
    }
}