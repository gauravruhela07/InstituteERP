import React, { Component } from 'react';
import axios from 'axios';
import history from './history';

import NavBarOnLoginPage from "./navbarOnLogin";
import AdminProfile from "./profile";

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        // const token = localStorage.getItem("token");
        // let loggedIn = true;
        // if (token == false) {
        //     loggedIn = false;
        // }

        this.state = {
            loggedIn: false,
            adminId: '',
            adminPassword: '',
            wrongCred: false
        };


        this.setAdminId = this.setAdminId.bind(this);
        this.setAdminPassword = this.setAdminPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setAdminId(e) {
        this.setState({
            adminId: e.target.value
        });
    }

    setAdminPassword(e) {
        this.setState({
            adminPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault()
        const { loggedIn, adminId, adminPassword } = this.state;

        axios.post('http://localhost:5000/adminCred/validate', { adminId, adminPassword })
            .then(res => {
                if (String(res.data.message) === "Auth Successful") {
                    let token = "Putin " + res.data.token;
                    localStorage.setItem("token", token);
                    this.setState({
                        loggedIn: true,
                        adminId: res.data.adminId,
                        adminPassword: res.data.adminPassword,
                        wrongCred: false
                    });

                }
                else if (String(res.data.message) === "Auth Failed") {
                    this.setState({
                        wrongCred: true
                    });
                }
            })
            .catch(err => console.log("Error:-" + err))
    }


    render() {
        if (this.state.loggedIn) {
            history.push('/admin/profile');
            return (
                <div>
                    <AdminProfile profile={this.state} />
                </div>
            )
        }
        return (
            <div>
                <div>
                    <NavBarOnLoginPage />
                </div>
                { this.state.wrongCred === true && <p>Your login credentials could not be verified, please try again.</p>}
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Enter AdminId </label>
                            <input type="text" required className="form-control" onChange={this.setAdminId} />
                        </div>
                        <div className="form-group">
                            <label>Enter Password </label>
                            <input type="password" required className="form-control" onChange={this.setAdminPassword} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-danger" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Redirect } from 'react-router-dom';


// const AdminLogin = () => {

//     const [AdminId, setAdminId] = useState();
//     const [AdminPassword, setAdminPassword] = useState();


//     const onAddingAdminId = (e) => {
//         setAdminId(e.target.value);
//         console.log(e.target.value);
//     }

//     const onAddingPassword = (e) => {
//         setAdminPassword(e.target.value);
//         console.log(e.target.value);
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
//         const credentials = {
//             adminId: AdminId,
//             adminPassword: AdminPassword
//         }
//         // console.log(credentials);
//         axios.post('http://localhost:5000/adminCred/validate/', credentials)
//             .then(res => {
//                 var a = String(res.data);
//                 if (a == "Yes") {
//                     console.log("Yes");
//                 }
//                 else {
//                     console.log("No");
//                     return alert("Incorrect credentials")
//                 }
//             })
//             .catch(err => console.log(err))
//     }



//     return (
//         <div>
//             <h3>Enter credentials</h3>
//             <form onSubmit={onSubmit}>
//                 <div className="form-group">
//                     <label>Admin Id </label>
//                     <input type="text" required className="form-control" onChange={onAddingAdminId} />
//                 </div>
//                 <div className="form-group">
//                     <label>Password </label>
//                     <input type="text" required className="form-control" onChange={onAddingPassword} />
//                 </div>
//                 <h3>{AdminId}</h3>
//                 <h3>{AdminPassword}</h3>
//                 <div className="form-group">
//                     <input type="submit" value="Submit" className="btn btn-danger" />
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default AdminLogin;