import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import NavbarClass from './postlogin_navbar.component.js';
import Login from './student.login.js';
import Registration from './student.course_registration';

export default class SelectSem extends Component{
    constructor(props) {
        super(props);
        
        const token = localStorage.getItem('token');
        let loggedIn = true;
        if(token==null) {
            loggedIn=false;
        }
        this.state = {
            loggedIn:loggedIn,
            current_sem: null,
            hasRegistered:null,
            clicked:0,
            canClick1:0,
            canClick2:0,
            canClick3:0,
            canClick4:0,
            canClick5:0,
            canClick6:0,
            canClick7:0,
            canClick8:0,
        };

        this._onClick1 = this._onClick1.bind(this);
    }

    componentDidMount() {
        const data = {
            roll_num: localStorage.getItem('roll_num')
        }

        axios.post("http://localhost:5000/student_subject/current_sem", data, {
            headers: {
                'authorization':localStorage.getItem('token')
            }
        })
        .then(res => {
            this.setState({current_sem:res.data});
            if(res.data==1) {
                this.setState({canClick1:1});
            }
            else if(res.data==2) {
                this.setState({canClick2:1});
            }
            else if(res.data==3) {
                this.setState({canClick3:1});
            }
            else if(res.data==4) {
                this.setState({canClick4:1});
            }
            else if(res.data==5) {
                this.setState({canClick5:1});
            }
            else if(res.data==6) {
                this.setState({canClick6:1});
            }
            else if(res.data==7) {
                this.setState({canClick7:1});
            }
            else if(res.data==8) {
                this.setState({canClick8:1});
            }

            // post request for fetching registeration status
            axios.post("http://localhost:5000/student_subject/checkRegisteration", data, {
                headers: {
                    'authorization':localStorage.getItem('token')
                }
            })
            .then(res => this.setState({hasRegistered:res.data}))
            .catch(err => {
                console.log(err);
            })

        })
        .catch(err => console.log(err));
    }
    _onClick1(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick2(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick3(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick4(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick5(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick6(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick7(e) {
        e.preventDefault();
        this.setState({clicked:1});
    }
    _onClick8(e) {
        e.preventDefault();
        this.setState({clicked:1});
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
        if(this.state.hasRegistered==-1) {
            return (
                <div>
                    <NavbarClass/>
                    <h4>Choose Your Upcoming Semester</h4>
                    <li>{this.state.canClick1 ?
                        <Link to='#' onClick={e => this._onClick1(e)}>Semester: 1</Link>:
                        <span>Semester: 1</span>}
                    </li>
                    <li>
                        {this.state.canClick2 ?
                        <Link to='#' onClick={e => this._onClick2(e)}>Semester: 2</Link>:
                        <span>Semester: 2</span>}
                    </li>
                    <li>
                        {this.state.canClick3 ?
                        <Link to='#' onClick={e => this._onClick3(e)}>Semester: 3</Link>:
                        <span>Semester: 3</span>}
                    </li>
                    <li>
                        {this.state.canClick4 ?
                        <Link to='#' onClick={e => this._onClick4(e)}>Semester: 4</Link>:
                        <span>Semester: 4</span>}
                    </li>
                    <li>
                        {this.state.canClick5 ?
                        <Link to='#' onClick={e => this._onClick5(e)}>Semester: 5</Link>:
                        <span>Semester: 5</span>}
                    </li>
                    <li>
                        {this.state.canClick6 ?
                        <Link to='#' onClick={e => this._onClick6(e)}>Semester: 6</Link>:
                        <span>Semester: 6</span>}
                    </li>
                    <li>
                        {this.state.canClick7 ?
                        <Link to='#' onClick={e => this._onClick7(e)}>Semester: 7</Link>:
                        <span>Semester: 7</span>}
                    </li>
                    <li>
                        {this.state.canClick8 ?
                        <Link to='#' onClick={e => this._onClick8(e)}>Semester: 8</Link>:
                        <span>Semester: 8</span>}
                    </li>
                    {this.state.clicked?
                    <Registration curr_sem={this.state.current_sem}/>:
                    <h3>...</h3>}
                    
                </div>
            )
        }
        else if(this.state.hasRegistered==0) {
            return (
                <div>
                    <NavbarClass/>
                    <h3>Your Registration Status is Pending!</h3>
                </div>
                )
        }
        else {
            return (
                <div>
                    <NavbarClass/>
                    <h3>Your Registration has Successfully Verified!</h3>
                </div>
            )
        }

    }
}