import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './style.css';
import NavbarClass from './prelogin_navbar.component';

export default class Login extends Component {
  constructor(props) {
    super(props)

    const token = localStorage.getItem("token");
    let loggedIn = true;
    if(token==null) {
        loggedIn = false;
    }

    this.state = {
       email: '',
       password: '',
       loggedIn
    };
    // this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  setEmail(e){
    this.setState({
      email:e.target.value
    });
  }

  setPassword(e){
    this.setState({
      password:e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault()
    const {email, password } = this.state;
    // console.log(this.state)
    //login magic
    axios.post('http://localhost:5000/student/login', {email, password})
    .then(res => {
      // console.log(res);
      if(res.data.message==='Auth Successful') {
        let token = "Putin "+res.data.token;
        localStorage.setItem("token", token)
        this.setState({
          loggedIn: true
        });
      }
    })
    .catch(err => console.log("Error: "+err))
  }

  render() {
    if(this.state.loggedIn) {
      // console.log(this.state);
      return <Redirect to="/student/home"/>
    }
    return (
      <div>
        <NavbarClass/>
        <div className="Login">
        <img src={require("./logo.png")} alt='#' />
        <h3>Enter Your Email and Password</h3>    
        <form onSubmit={this.submitForm}>
            <FormGroup controlId="email" bsSize="large">
            {/* <FormLabel>Email</FormLabel> */}
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.setEmail}
              placeholder="Email"
            />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
            {/* <FormLabel>Password</FormLabel> */}
            <FormControl
              value={this.state.password}
              onChange={this.setPassword}
              type="password"
              placeholder="Password"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit" >
              Login
            </Button>
        </form>
        </div>
      </div>
    )
  }
}
