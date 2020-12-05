import React, { Component } from 'react';
import * as XLSX from "xlsx";
import axios from "axios";
import NavBarAfterLoginPage from "./navbarAfterLogin";

export default class uploadStudentData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfStudents: [],
            isStudentUpdated: 0
        };

        this.readExcel = this.readExcel.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    componentDidMount() {
        // console.log("Inside compodidMou");
        axios.get('http://localhost:5000/student/getAllStudents')
            .then(res => {
                var arr = res.data.arrayOfStudents;
                console.log(arr);
                if (arr.length > 0) {
                    this.setState({
                        arrayOfStudents: arr,
                        isStudentUpdated: 0
                    })
                }
            })
    }

    componentDidUpdate() {
        if (this.state.isStudentUpdated === 1) {
            // console.log("Inside compodidUpdate and if");
            axios.post('http://localhost:5000/student/insertStudent', { theArray: this.state.arrayOfStudents })
                .then(res => {
                    if (String(res.data.message) === "successful") {
                        console.log("Insertion Successful");
                    }
                    else if (String(res.data.message) === "unsuccessful") {
                        console.log("Not Inserted");
                    }
                })
                .catch(err => console.log("Error"))
        }
        return;


        // var arrayOfRollNum = [];
        // var i;
        // for (i=0;i<this.state.arrayOfStudents.length;i++){
        //     arrayOfRollNum.push(this.state.arrayOfStudents[i]["roll_num"]);
        // }

        // var arrayOfSemesters = [];
        // for (i=0;i<arrayOfRollNum.length;i++){
        //     var rollNumber = arrayOfRollNum[i];
        //     console.log(rollNumber);
        //     // find the highest semester number corresponding to this roll number
        //     axios.post('http://localhost:5000/studentSub/getLatestSemesterNoOfRollNo', {roll_num: rollNumber})
        //         .then(result => {
        //             console.log(result.data);
        //             if (result.data.message==="Successful"){ 
        //                 arrayOfSemesters.push(result.data.maxSemester);
        //             }
        //             else if(result.data.message==="Unsuccessful"){
        //                 arrayOfSemesters.push(-1);
        //             }
        //         })
        // }
        // console.log(arrayOfSemesters);

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
            this.setState({
                arrayOfStudents: theArray,
                isStudentUpdated: 1
            });
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
                    <h3>Choose Student Information File</h3>
                    <input type="file" onChange={this.onClick} />
                </div>
                <div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>has_registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrayOfStudents.map((student) => {
                                return (
                                    <tr>
                                        <td>{student["roll_num"]}</td>
                                        <td>{student["name"]}</td>
                                        <td>{student["department"]}</td>
                                        <td>{student["has_registered"]}</td>
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
