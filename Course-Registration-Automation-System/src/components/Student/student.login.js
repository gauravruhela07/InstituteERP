import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {axios} from 'axios';

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
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  onChange(e) { 
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault()
    const {email, password } = this.state;
    //login magic

    if(email==='A' && password==='B') {
      localStorage.setItem("token", "kjasdfhhafdgskfhadgk");
      this.setState({
        loggedIn: true
      })
    }

  }
  render() {
    if(this.state.loggedIn) {
      console.log(this.state);
      return <Redirect to="/student/home"/>
    }
    return (
      <div>
        <h1>Login</h1>    
        <form onSubmit={this.submitForm}>
            <input type="text" placeholder="Email Id" name="email" value={this.state.email} onChange={this.onChange} />
            <br/>
            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            <br/>
            <input type="submit" />
            <br/>
        </form>
      </div>
    )
  }
}
