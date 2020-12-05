import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";

import NavBarAfterLoginPage from "./navbarAfterLogin";
import { Collapse } from "bootstrap";

const Profile = (props) => {

    const [name, setName] = useState();
    const [facultyId, setfacultyId] = useState();
    const [department, setDepartment] = useState();
    const [hod, sethod] = useState();
    const [loggedIn, setloggedIn] = useState(true);

    useEffect(() => {
        var adminId = localStorage.getItem("adminId");
        if (adminId == null) {
            var adminId = props.profile.adminId;
            localStorage.setItem("adminId", adminId);
        }
        // var adminId = props.profile.adminId;
        // const token = localStorage.getItem("token")
        // let loggedIn = true;
        // if (token == null) {
        //     loggedIn = false;
        // }

        axios.post('http://localhost:5000/faculty/getAdmin', { adminId: adminId })
            .then(response => {
                setName(response.data[0].name);
                setfacultyId(response.data[0].faculty_id);
                setDepartment(response.data[0].department);
                if (response.data[0].HOD) sethod("Yes");
                else sethod("No");
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <NavBarAfterLoginPage />
            <div>
                <div className = "container">
                    <h3>Welcome Admin</h3>
                    <table className="content-table">
                        <thead >
                            <tr>
                                <th>Name</th>
                                <th>Faculty Id</th>
                                <th>Department</th>
                                <th>HOD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dr. XXXXXXXX</td>
                                <td>{facultyId}</td>
                                <td>{department}</td>
                                <td>XXXXXXXX</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Profile;