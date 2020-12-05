import axios from 'axios';
import React, {Component} from 'react';
import { FormControl, FormGroup, Button, Form } from 'react-bootstrap';

import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        
        let loggedIn = true;
        const token = localStorage.getItem('token');
        if(token==null) {
            loggedIn=false;
        }
        this.state = {
             loggedIn : loggedIn,
             password:'',
             newPassword:'',
             newPasswordAgain:''
        };
        this.setPassword = this.setPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.setNewPasswordAgain = this.setNewPasswordAgain.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    validateForm() {
        return this.state.password.length>0 && this.state.newPassword.length>0 && this.state.newPasswordAgain.length>0;
    }

    setPassword(e){
        this.setState({
            password:e.target.value
        });
    }

    setNewPassword(e) {
        this.setState({
            newPassword:e.target.value
        });
    }

    setNewPasswordAgain(e) {
        this.setState({
            newPasswordAgain:e.target.value
        });
        
    }

    submitForm(e) {
        e.preventDefault();
        if(this.state.newPasswordAgain!==this.state.newPassword) {
            window.alert('New Password Not Matching! Kindly Check!');
            return ;
        }
        const data = {
            roll_num: localStorage.getItem('roll_num'),
            password: this.state.password,
            changed_password: this.state.newPassword
        }
        axios.post('http://localhost:5000/student_subject/changePassword', data, {
            headers: {
                'authorization':localStorage.getItem('token')
            }
        })
        .then(res => {
            window.alert('Password Changed Successfully!');
            window.location = '/student/home';
        })
        .catch(err => console.log('Error: '+err));
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
        return (
            <div>
                <NavbarClass/>
                <br/>
                <div className='container'>
                    <div className='jumbotron'>
                    <form onSubmit={this.submitForm}>
                        <FormGroup controlId="password1">
                        <Form.Label>Current Password</Form.Label>
                        <FormControl
                            autoFocus
                            type="password"
                            value={this.state.password}
                            onChange={this.setPassword}
                            placeholder="Enter Current Password"
                        />
                        </FormGroup>
                        <FormGroup controlId="password2">
                        <Form.Label>New Password</Form.Label>
                        <FormControl
                            autoFocus
                            value={this.state.newPassword}
                            onChange={this.setNewPassword}
                            type="password"
                            placeholder="Enter New Password"
                        />
                        </FormGroup>
                        <FormGroup controlId="password3">
                        <Form.Label>Re-enter New Password</Form.Label>
                        <FormControl
                            autoFocus
                            type="password"
                            value={this.state.newPasswordAgain}
                            onChange={this.setNewPasswordAgain}
                            placeholder="Again Enter New Password"
                        />
                        </FormGroup>
                        {this.state.message}
                        <Button variant="primary" disabled={!this.validateForm()}
                        type="submit">
                            Change
                        </Button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
    
}