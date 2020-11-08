import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState();
    const [facultyId, setfacultyId] = useState();
    const [department, setDepartment] = useState();
    const [hod, sethod] = useState();

    useEffect(() => {
        console.log("Hahaha");
        var i, nameL, facultyIdL, departmentL, hodL;
        axios.get('http://localhost:5000/faculty/getAdmins')
            .then(response => {
                for (i = 0; i < response.data.length; i++) {
                    setName(response.data[i].name);
                    setfacultyId(response.data[i].faculty_id);
                    setDepartment(response.data[i].department);
                    if (response.data[i].HOD) sethod("Yes");
                    else sethod("No");
                }
            })
    }, [])

    return (
        <div>
            <div>
                <h5>Welcome Admin</h5>
                <h3>You are...</h3>
                <label>Name:-</label>
                <label>{name}</label>
                <label>Faculty Id:-</label>
                <label>{facultyId}</label>
                <label>Department:-</label>
                <label>{department}</label>
                <label>HOD:-</label>
                <label>{hod}</label>
            </div>
        </div>
    );
}

export default Profile;