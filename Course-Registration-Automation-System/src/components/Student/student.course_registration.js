import axios from 'axios';
import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
// import Course from '../../../backend/models/course.model';

import NavbarClass from './postlogin_navbar.component';
import Login from './student.login';


const CourseTable = (props) => (
    <tr>
        <td>{props.course.course_name}</td>
        <td>{props.course.course_id}</td>
        <td>{props.course.department}</td>
        {/* <td>{props.course.elective}</td> */}
    </tr>
)

const OptionalForms = (props) => (
    <div className="form-group">
        <input 
            className="form-control"
            type="text"
            value={props.course_name}
        />
    </div>
)
export default class Registration extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token==null){
            loggedIn=false;
        }
        this.state = {
            loggedIn:loggedIn,
            courses : [],
            checked: 0
        }

        this.courseList = this.courseList.bind(this);
        this.countNumberOfOptional = this.countNumberOfOptional.bind(this);
        this.groupByOptional = this.groupByOptional.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.radioLabel = this.radioLabel.bind(this);
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
        .then(res => this.setState({courses:res.data}))
        .catch(err => {
            console.log(err);
        })
    }

    
    courseList() {
        return this.state.courses.map(currentCourse => {
            if(currentCourse.elective == -1){
                return <CourseTable course={currentCourse}/>
            }
        })
    }

    countNumberOfOptional() {
        var optionalSet = new Set();
        this.state.courses.forEach((course) => {
            if(course.elective > -1) {
                optionalSet.add(course.elective)
            }
        });
        return optionalSet;
    }

    groupByOptional() {
        var optionalSet = new Set();
        this.state.courses.forEach((course) => {
            if(course.elective > -1) {
                optionalSet.add(course.elective)
            }
        });
        // var optionalSet = this.countNumberOfOptional();
        console.log(optionalSet);
        var group = [];
        console.log(this.state.courses);
        for(let elective of optionalSet) {
            var optionalArr = [];
            this.state.courses.forEach((course) => {
                if(course.elective==elective) {
                    optionalArr.push(course);
                }
            });
            group.push(optionalArr);
        }
        console.log(group[0][0]);
        return group;
    }

    radioChange = (i) => {
        this.setState({checked:i});
    }

    radioLabel() {
        if(this.state.courses.length==0){
            return (<div>Loading...</div>);
        }
        var group = this.groupByOptional();
        console.log(group);
        return group[0].map((course, i) => {
            // console.l og();
            return <div>
                    {course.course_id+': '+course.course_name}
                    <input
                        type='radio'
                        checked={this.state.checked==0?true:false}
                        onChange={this.radioChange.bind(this,i)}
                        value={course.course_id+': '+course.course_name}
                        />
                    </div>
        });
    }


    render() {
        // console.log(this.groupByOptional());
        console.log(this.state.courses.length);
        if(this.state.loggedIn===false){
            this.props.history.push('/student/login');
            return (
                <div>
                    <Login/>
                </div>
            );
        }
    return (
        <div>
            <NavbarClass/>
            <div className="container">
                <h3>Mandatory Courses</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Department</th>
                            {/* <th>Elective</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.courseList()}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <h3>Optional Courses</h3>
                <form onSubmit={this.onSubmit}>
                    {this.radioLabel()}
                </form>
            </div> 
        </div>
        );
    }
}