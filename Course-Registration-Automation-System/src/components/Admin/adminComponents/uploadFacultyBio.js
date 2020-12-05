import React, { Component } from 'react';
import * as XLSX from "xlsx";
import axios from "axios";
import NavBarAfterLoginPage from "./navbarAfterLogin";

export default class uploadFacultyBio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfFaculty: [],
            isFacultyUpdated: 0
        }

        this.readExcel = this.readExcel.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    componentDidMount() {
        // console.log("inside componentdidmount");
        axios.get('http://localhost:5000/faculty/getAllFaculty')
            .then(res => {
                var arr = res.data.faculties;
                console.log(arr);
                if (arr.length > 0) {
                    this.setState({
                        arrayOfFaculty: arr,
                        isFacultyUpdated: 0
                    })
                }
            })
    }


    componentDidUpdate() {
        if (this.state.isFacultyUpdated === 1) {
            // console.log("inside componentdidupdate and if");
            axios.post('http://localhost:5000/faculty/add', { theArray: this.state.arrayOfFaculty })
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
                arrayOfFaculty: theArray,
                isFacultyUpdated: 1
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
                    <h3>Choose Faculty Bio Information File</h3>
                    <input type="file" onChange={this.onClick} />
                </div>
                <div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Faculty Id</th>
                                <th>Department</th>
                                <th>Admin</th>
                                <th>HOD</th>
                                <th>Advisor</th>
                                <th>advisory_sem</th>
                                <th>advisory_branch</th>
                                <th>advisory_program</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrayOfFaculty.map((faculty) => {
                                if (faculty["Advisor"] === "yes") {
                                    return (
                                        <tr>
                                            <td>{faculty["name"]}</td>
                                            <td>{faculty["faculty_id"]}</td>
                                            <td>{faculty["department"]}</td>
                                            <td>{faculty["admin"]}</td>
                                            <td>{faculty["HOD"]}</td>
                                            <td>{faculty["Advisor"]}</td>
                                            <td>{faculty["advisory_sem"]}</td>
                                            <td>{faculty["advisory_branch"]}</td>
                                            <td>{faculty["advisory_program"]}</td>
                                        </tr>
                                    )
                                }
                                else if (faculty["Advisor"] === "no") {
                                    return (
                                        <tr>
                                            <td>{faculty["name"]}</td>
                                            <td>{faculty["faculty_id"]}</td>
                                            <td>{faculty["department"]}</td>
                                            <td>{faculty["admin"]}</td>
                                            <td>{faculty["HOD"]}</td>
                                            <td>{faculty["Advisor"]}</td>
                                        </tr>
                                    )

                                }
                                else if (faculty["Advisor"].length > 3) {
                                    var advisoryString = faculty["Advisor"];
                                    var arr = advisoryString.split(",");
                                    return (
                                        <tr>
                                            <td>{faculty["name"]}</td>
                                            <td>{faculty["faculty_id"]}</td>
                                            <td>{faculty["department"]}</td>
                                            <td>{faculty["admin"]}</td>
                                            <td>{faculty["HOD"]}</td>
                                            <td>yes</td>
                                            <td>{arr[0]}</td>
                                            <td>{arr[1]}</td>
                                            <td>{arr[2]}</td>
                                        </tr>
                                    )
                                }
                                else if (faculty["Advisor"].length < 3) {
                                    return (
                                        <tr>
                                            <td>{faculty["name"]}</td>
                                            <td>{faculty["faculty_id"]}</td>
                                            <td>{faculty["department"]}</td>
                                            <td>{faculty["admin"]}</td>
                                            <td>{faculty["HOD"]}</td>
                                            <td>no</td>
                                        </tr>
                                    )

                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
