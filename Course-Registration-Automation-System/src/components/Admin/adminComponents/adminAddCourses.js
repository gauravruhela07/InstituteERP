import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from "react-dom";
import NavBarAfterLoginPage from "./navbarAfterLogin";

const AdminAddCourses = () => {

    const [courseName, setcourseName] = useState();
    const [courseId, setcourseId] = useState();
    const [department, setdepartment] = useState();
    const [counterList, setcounterList] = useState([1]);
    //const [elective, setelective] = useState();

    const onAdditionOfCourse = (e) => {
        setcourseName(e.target.value);
    };

    const onMakingCourseId = (e) => {
        setcourseId(e.target.value);
    };

    const onSelectingDepartment = (e) => {
        setdepartment(e.target.value);
    };

    // const onSelectingElective = (e) => {
    //     if ((e.target.value) == true) setelective(true);
    //     else if ((e.target.value) == false) setelective(false);
    // };

    const onSubmit = (e) => {
        const course = {
            semester_num: "-1",
            course_id: courseId,
            course_name: courseName,
            department: department,
            elective: "-1"
        }
        axios.post('/course/add/', course)
            .then(() => console.log("Course added"))
            .catch(err => console.log("Course not added Error found"));

        setcourseId(null);
        setcourseName(null);
        setdepartment(null);
        setcounterList([...counterList, 1]);
        // setelective(null);
    }

    return (
        <div>
            <div className="container">
                <NavBarAfterLoginPage />
            </div>
            <div>
                {counterList.map((x, i) => {
                    if (i == counterList.length - 1) {
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
                                        {/* <input type="submit" value="Add this Course" className="btn btn-danger" /> */}
                                        <a onClick={() => { onSubmit() }}>Submit</a>
                                    </div>
                                </form>
                            </div>
                        );
                    }
                })
                }
            </div>
        </div>
    );
};

export default AdminAddCourses;