import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from "react-dom";

const AdminAddfaculty = () => {

    const [facultyName, setfacultyName] = useState();
    const [facultyId, setfacultyId] = useState();
    const [department, setdepartment] = useState();
    const [hod, sethod] = useState();
    const [admin, setadmin] = useState();

    const onAdditionOfFaculty = (e) => {
        setfacultyName(e.target.value);
    };

    const onMakingFacultyId = (e) => {
        setfacultyId(e.target.value);
    };

    const onSelectingDepartment = (e) => {
        setdepartment(e.target.value);
    };

    const onSelectingAdmin = (e) => {
        if ((e.target.value) == "True") setadmin(true);
        else if ((e.target.value) == "False") setadmin(false);
    };

    const onSelectingHOD = (e) => {
        if ((e.target.value) == "True") sethod(true);
        else if ((e.target.value) == "False") sethod(false);
    };


    const onSubmit = () => {
        const faculty = {
            name: facultyName,
            faculty_id: facultyId,
            department: department,
            admin: admin,
            hod: hod
        }
        console.log(faculty);
        axios.post('http://localhost:5000/faculty/add/', faculty)
            .then(() => console.log("faculty added"))
            .catch(err => console.log("Faculty not added Error found"))

        setfacultyId(null);
        setfacultyName(null);
        setdepartment(null);
        setadmin(null);
        sethod(null);
    };

    return (
        <div>
            <h3>Enter a New Faculty getting added in Our Institute</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Faculty Name </label>
                    <input type="text" required className="form-control" onChange={onAdditionOfFaculty} />
                </div>
                <div className="form-group">
                    <label>Faculty Id </label>
                    <input type="text" required className="form-control" onChange={onMakingFacultyId} />
                </div>
                <div className="form-group">
                    <label>Department: </label>
                    <select class="form-control" name="departmentSelect" onChange={onSelectingDepartment}>
                        <option value="none">Select a department</option>
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="ECE">Electronics and Communication Engineering</option>
                        <option value="HS">Humanities and Social Sciences</option>
                        <option value="Maths">Mathematics</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>HOD: </label>
                    <select class="form-control" name="HODSelect" onChange={onSelectingHOD}>
                        <option value="none">Is an HOD? </option>
                        <option value="True">Yes</option>
                        <option value="False">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Admin: </label>
                    <select class="form-control" name="adminSelect" onChange={onSelectingAdmin}>
                        <option value="none">Is an admin?</option>
                        <option value="True">Yes</option>
                        <option value="False">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add this Faculty" className="btn btn-danger" />
                </div>
            </form>
        </div>
    );
};

export default AdminAddfaculty;