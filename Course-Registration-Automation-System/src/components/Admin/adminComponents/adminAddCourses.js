import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from "react-dom";

const AdminAddCourses = () => {

    const [courseName, setcourseName] = useState();
    const [courseId, setcourseId] = useState();
    const [department, setdepartment] = useState();
    const [elective, setelective] = useState();

    const onAdditionOfCourse = (e) => {
        setcourseName(e.target.value);
    };

    const onMakingCourseId = (e) => {
        setcourseId(e.target.value);
    };

    const onSelectingDepartment = (e) => {
        setdepartment(e.target.value);
    };

    const onSelectingElective = (e) => {
        if ((e.target.value) == true) setelective(true);
        else if ((e.target.value) == false) setelective(false);
    };

    const onSubmit = (e) => {
        const course = {
            semester_num: "-1",
            course_id: courseId,
            course_name: courseName,
            department: department,
            elective: elective
        }
        axios.post('http://localhost:5000/course/add/', course)
            .then(() => console.log("Course added"))
            .catch(err => console.log("Course not added Error found"));

        setcourseId(null);
        setcourseName(null);
        setdepartment(null);
        setelective(null);
    }

    return (
        <div>
            <h3>Enter a New Course getting Included in Our Institute</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Course Name </label>
                    <input type="text" required className="form-control" onChange={onAdditionOfCourse} />
                </div>
                <div className="form-group">
                    <label>Course Id </label>
                    <input type="text" required className="form-control" onChange={onMakingCourseId} />
                </div>
                <div className="form-group">
                    <label>Department: </label>
                    <select class="form-control" name="courseSelect" onChange={onSelectingDepartment}>
                        <option value="none">Select a department</option>
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="ECE">Electronics and Communication Engineering</option>
                        <option value="HS">Humanities and Social Sciences</option>
                        <option value="Maths">Mathematics</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Elective: </label>
                    <select class="form-control" name="courseSelect" onChange={onSelectingElective}>
                        <option value="none">Is it an elective </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add this Course" className="btn btn-danger" />
                </div>
            </form>
        </div>
    );
};

export default AdminAddCourses;