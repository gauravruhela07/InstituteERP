import React, { Component } from 'react';
import * as XLSX from "xlsx";
import axios from "axios";
import NavBarAfterLoginPage from "./navbarAfterLogin";

export default class uploadCourseData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseArray: [],
            isCourseUpdated: 0,
            myMap: {}
        }

        this.readExcel = this.readExcel.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    componentDidMount() {
        axios.get('http://localhost:5000/course/getAllCourses')
            .then(res => {
                var arr = res.data.courses;
                // console.log("Inside componentdidmount");
                console.log(arr);
                if (arr.length > 0) {
                    this.setState({
                        courseArray: arr,
                        isCourseUpdated: 0
                    })
                }
            })
    }

    componentDidUpdate() {
        if (this.state.isCourseUpdated === 1) {
            // console.log("Inside componentdidupdate and if");
            axios.post('http://localhost:5000/course/insertCourse', { theArray: this.state.courseArray })
                .then(res => {
                    if (String(res.data.message) === "successful") {
                        console.log("courses inserted Successful");
                    }
                    else if (String(res.data.message) === "unsuccessful") {
                        console.log("courses not Inserted");
                    }
                })
                .then(() => {
                    axios.post('http://localhost:5000/teaches/addFacultyCou', { mapp: JSON.stringify(this.state.myMap) })
                        .then(res => {
                            if (String(res.data.message) === "successful") {
                                console.log("teaches Insertion Successful");
                            }
                            else if (String(res.data.message) === "unsuccessful") {
                                console.log("teaches Not Inserted");
                            }
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        }
    }


    readExcel(file) {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((theArray) => {
            var map1 = {};
            var i, j;
            for (i = 0; i < theArray.length; i++) {
                if (theArray[i]["faculties"] === null) continue;
                var arrayOfFaculties = theArray[i]["faculties"].split(",");
                for (j = 0; j < arrayOfFaculties.length; j++) {
                    var fac = arrayOfFaculties[j];
                    var facultyKey = fac.trim();
                    if ((facultyKey in map1) === false) {
                        map1[facultyKey] = [{ "course_id": theArray[i]["course_id"], "course_name": theArray[i]["course_name"] }];
                    }
                    else if ((facultyKey in map1) === true) {
                        map1[facultyKey].push({ "course_id": theArray[i]["course_id"], "course_name": theArray[i]["course_name"] });
                    }
                }
            }
            // console.log("map1");
            // console.log(map1);
            this.setState({
                myMap: map1,
                courseArray: theArray,
                isCourseUpdated: 1
            })
        });
    };

    onClick(e) {
        const file = e.target.files[0];
        this.readExcel(file);
    }

    render() {
        return (
            <div>
                <NavBarAfterLoginPage />
                <div>
                    <h3>Choose Course Information File</h3>
                    <input type="file" onChange={this.onClick} />
                </div>
                <div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Semester Number</th>
                                <th>course id</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Elective</th>
                                <th>L</th>
                                <th>T</th>
                                <th>P</th>
                                <th>C</th>
                                <th>faculties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.courseArray.map((course) => {
                                return (
                                    <tr>
                                        <td>{course["semester_num"]}</td>
                                        <td>{course["course_id"]}</td>
                                        <td>{course["course_name"]}</td>
                                        <td>{course["department"]}</td>
                                        <td>{course["elective"]}</td>
                                        <td>{course["L"]}</td>
                                        <td>{course["T"]}</td>
                                        <td>{course["P"]}</td>
                                        <td>{course["C"]}</td>
                                        <td>{course["faculties"]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
