import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
// import { FormControl } from 'react-bootstrap';
// import Course from '../../../backend/models/course.model';

// import NavbarClass from './postlogin_navbar.component';
// import Login from './student.login';



const CourseTable = (props) => (
    <tr>
        <td>{props.course.course_name}</td>
        <td>{props.course.course_id}</td>
        <td>{props.course.department}</td>
        <td>{props.course.L}</td>
        <td>{props.course.T}</td>
        <td>{props.course.P}</td>
        <td>{props.course.C}</td>
    </tr>
)
export default class Registration extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn: loggedIn,
            courses: [],
            checked: 0,
            selectedOption: null,
            selectedOption1: null,
            selectedOption2: null,
            selectedOption3: null,
            semester_transaction_id: "",
            mess_transaction_id: ""
        }

        this.courseList = this.courseList.bind(this);
        this.countNumberOfOptional = this.countNumberOfOptional.bind(this);
        this.groupByOptional = this.groupByOptional.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.convToOptions = this.convToOptions.bind(this);
        this.createSelect0 = this.createSelect0.bind(this);
        this.createSelect1 = this.createSelect1.bind(this);
        this.createSelect2 = this.createSelect2.bind(this);
        this.createSelect3 = this.createSelect3.bind(this);
        this.optionalCoursesHeader = this.optionalCoursesHeader.bind(this);
        this.sem_transaction = this.sem_transaction.bind(this);
        this.mess_transaction = this.mess_transaction.bind(this);
    }

    componentDidMount() {
        const data = {
            roll_num: localStorage.getItem('roll_num')
        }
        axios.post("http://localhost:5000/student_subject/current_sem_courses", data, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(res => {
                var courses = [];
                var len = res.data.length;
                for (var i = 0; i < len; i++) {
                    var splitted = res.data[i].dept_alloted.split(',');
                    for (var j = 0; j < splitted.length; j++) {
                        if (splitted[j] === localStorage.getItem('department')) {
                            courses.push(res.data[i]);
                            break;
                        }
                    }
                }
                this.setState({ courses: courses });
            })
            .catch(err => {
                console.log(err);
            })

        // post request for fetching registeration status
        axios.post("http://localhost:5000/student_subject/checkRegisteration", data, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(res => this.setState({ hasRegistered: res.data }))
            .catch(err => {
                console.log(err);
            })
    }


    courseList() {
        return this.state.courses.map(currentCourse => {
            if (currentCourse.elective == -1) {
                return <CourseTable course={currentCourse} />
            }
        })
    }

    countNumberOfOptional() {
        var optionalSet = new Set();
        this.state.courses.forEach((course) => {
            if (course.elective > -1) {
                optionalSet.add(course.elective)
            }
        });
        return optionalSet;
    }

    groupByOptional() {
        var optionalSet = new Set();
        this.state.courses.forEach((course) => {
            if (course.elective > -1) {
                optionalSet.add(course.elective)
            }
            // console.log(course.elective);
        });
        var group = [];
        for (let elective of optionalSet) {
            var optionalArr = [];
            this.state.courses.forEach((course) => {
                if (course.elective == elective) {
                    optionalArr.push(course);
                }
            });
            group.push(optionalArr);
        }
        return group;
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption: selectedOption });
    }
    handleChange1(selectedOption1) {
        this.setState({ selectedOption1: selectedOption1 });
    }
    handleChange2(selectedOption2) {
        this.setState({ selectedOption2: selectedOption2 });
    }
    handleChange3(selectedOption3) {
        this.setState({ selectedOption3: selectedOption3 });
    }

    convToOptions(i) {
        const options = [];
        if (this.state.courses.length == 0)
            return options;
        var group = this.groupByOptional();
        if (group.length == 0) {
            return -1;
        }
        group[i].map(course => options.push({ value: course.course_id, label: course.course_name }));
        return options;
    }

    createSelect0() {
        if (this.state.courses.length == 0) {
            return <h4>Loading...</h4>
        }
        const selectedOption = this.state.selectedOption;
        const options = this.convToOptions(0);
        if (options !== -1) {
            return (<div><label>Elective 1:</label><Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                required
            /><br /></div>)
        }
    }
    createSelect1() {
        if (this.state.courses.length == 0) {
            return <h4>Loading...</h4>
        }
        var group = this.groupByOptional();
        if (group.length > 1) {
            const selectedOption = this.state.selectedOption1;
            const options = this.convToOptions(1);
            return (<div><label>Elective 2:</label><Select
                value={selectedOption}
                onChange={this.handleChange1}
                options={options}
            /><br /></div>)
        }
    }
    createSelect2() {
        if (this.state.courses.length == 0) {
            return <h4>Loading...</h4>
        }
        var group = this.groupByOptional();
        if (group.length > 2) {
            const selectedOption = this.state.selectedOption1;
            const options = this.convToOptions(2);
            return (<div><label>Elective 3:</label><Select
                value={selectedOption}
                onChange={this.handleChange2}
                options={options}
            /><br /></div>)
        }
    }
    createSelect3() {
        if (this.state.courses.length == 0) {
            return <h4>Loading...</h4>
        }
        var group = this.groupByOptional();
        if (group.length > 3) {
            const selectedOption = this.state.selectedOption1;
            const options = this.convToOptions(3);
            return (<div><label>Elective 4:</label><Select
                value={selectedOption}
                onChange={this.handleChange3}
                options={options}

            /><br /></div>)
        }
    }


    onSubmit(e) {
        // console.log(this.state.courses.length);
        var group = this.groupByOptional();
        e.preventDefault();
        var course_id_list = [];
        var course_name_list = [];

        // mandatory courses
        for (var i = 0; i < this.state.courses.length; i++) {
            if (this.state.courses[i].elective == -1) {
                course_id_list.push(this.state.courses[i].course_id);
                course_name_list.push(this.state.courses[i].course_name);
            }
        }

        var len = course_id_list.length;
        // electives that the student has chosen
        if (this.state.selectedOption != null) {
            course_id_list.push(this.state.selectedOption.value);
            course_name_list.push(this.state.selectedOption.label);
        }
        if (this.state.selectedOption1 != null) {
            course_id_list.push(this.state.selectedOption1.value);
            course_name_list.push(this.state.selectedOption1.label);
        }
        if (this.state.selectedOption2 != null) {
            course_id_list.push(this.state.selectedOption2.value);
            course_name_list.push(this.state.selectedOption2.label);
        }
        if (this.state.selectedOption3 != null) {
            course_id_list.push(this.state.selectedOption3.value);
            course_name_list.push(this.state.selectedOption3.label);
        }
        var len1 = course_id_list.length;

        // will disable the submit button until optional is selected
        if (len == len1 && group.length !== 0) {
            return;
        }
        if (course_id_list.length !== 0) {
            axios.post("http://localhost:5000/student_subject/current_sem",
                { roll_num: localStorage.getItem('roll_num') },
                {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    const data = {
                        roll_num: localStorage.getItem('roll_num'),
                        semester_num: res.data,
                        course_id_list: course_id_list,
                        course_name_list: course_name_list,
                        hasRegistered: "0",
                    }
                    // console.log(data)
                    axios.post('http://localhost:5000/student_subject/registerWithElective', data, {
                        headers: {
                            'authorization': localStorage.getItem('token')
                        }
                    })
                        .then(res => {
                            // console.log(res.data);
                            const data1 = {
                                roll_num: localStorage.getItem('roll_num'),
                                semester_num: data.semester_num,
                                semester_transaction_id: this.state.semester_transaction_id,
                                mess_transaction_id: this.state.mess_transaction_id,
                                department: localStorage.getItem('department')
                            }
                            console.log(data1);
                            axios.post('http://localhost:5000/student_subject/upload_fees', data1, {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            })
                                .then(res => console.log(res))
                                .catch(err => console.log('Error: ' + err));
                            window.location = '/student/thanks';
                        })
                        .catch(err => console.log('Error: ' + err));
                })
                .catch(err => console.log('Error: ' + err))

        }
    }
    optionalCoursesHeader() {
        const group = this.groupByOptional();
        if (group.length !== 0) {
            return <h3>Optional Courses</h3>
        }
    }
    sem_transaction(e) {
        this.setState({ semester_transaction_id: e.target.value });
    }
    mess_transaction(e) {
        this.setState({ mess_transaction_id: e.target.value });
    }



    render() {
        return (
            <div>
                {/* <NavbarClass/> */}
                <div className="container">
                    <h3>Mandatory Courses</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Course Name</th>
                                <th>Course ID</th>
                                <th>Department</th>
                                <th>L</th>
                                <th>T</th>
                                <th>P</th>
                                <th>C</th>
                                {/* <th>Elective</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.courseList()}
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    {/* <h3>Optional Courses</h3>
                    */}
                    {
                        this.optionalCoursesHeader()
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            {
                                this.createSelect0()
                            }
                            {
                                this.createSelect1()
                            }
                            {
                                this.createSelect2()
                            }
                            {
                                this.createSelect3()
                            }
                        </div>
                        <h4>Semester Fees Records</h4>
                        <div className="form-group">
                            <label>Transaction ID: </label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                value={this.state.semester_transaction_id}
                                onChange={this.sem_transaction}
                            />
                        </div>
                        <h4>Mess Fees Records</h4>
                        <div className="form-group">
                            <label>Transaction ID: </label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                value={this.state.mess_transaction_id}
                                onChange={this.mess_transaction}
                            />
                        </div>
                        <div className="form-group-button-edit">
                            <input type='submit' value="Submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}