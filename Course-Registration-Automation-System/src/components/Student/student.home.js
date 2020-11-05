import axios from 'axios';
import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';

import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';
export default class StudentHome extends Component {
    constructor(props) {
        super(props)

        let email =  localStorage.getItem("email")? localStorage.getItem("email"): this.props.student.email;

        const token = localStorage.getItem("token")
        let loggedIn = true;
        if(token==null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn:loggedIn,
            email:email,
            name: "",
            department:"",
            roll_num:""
        }

    }
    
    componentDidMount() {
        
        if(!localStorage.getItem("email")){
            localStorage.setItem("email", this.props.student.email);
        }

        // console.log(this.state);
        this.setState({
            email:localStorage.getItem("email")
        });

        axios.get('http://localhost:5000/student_subject/detail', {
            body: {
                email:localStorage.getItem("email")
            },
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(res => {
            // console.log(res.data[0].email);
            this.setState({
                email:res.data[0].email,
                name:res.data[0].name,
                department: res.data[0].department,
                roll_num: res.data[0].roll_num
            })
            if(!localStorage.getItem('roll_num')) {
                localStorage.setItem('roll_num', this.state.roll_num);
            }
            if(!localStorage.getItem('department')) {
                localStorage.setItem('department', this.state.department);
            }

        })
        .catch(err => console.log("Error: "+err))
    }

    render() {
        
        if(this.state.loggedIn === false){
            this.props.history.push('/student/login');
            // return <Redirect to='/student/login' />
            return (
                <div>
                    <Login/>
                </div>
            );
        }
        return (
            <div>
                <NavbarClass/>
                <h1>Welcome, {this.state.name}!</h1>
                <h2>Roll Number: {this.state.roll_num}</h2>
                <h2>Department: {this.state.department}</h2>
                <h2>Email: {this.state.email}</h2>
            </div>
        )
    }
}