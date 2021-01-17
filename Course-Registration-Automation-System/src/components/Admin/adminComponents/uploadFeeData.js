import React, { Component } from 'react';
import * as XLSX from "xlsx";
import axios from "axios";
import NavBarAfterLoginPage from "./navbarAfterLogin";

export default class uploadStudentData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfFee: [],
            isFeeUpdated: 0
        }

        this.readExcel = this.readExcel.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    componentDidMount() {
        // console.log("inside componentdidmount");
        axios.get('/fee/getAllFeeDetails')
            .then(result => {
                var arr = result.data.arrayOfFees;
                console.log(arr);
                if (arr.length > 0) {
                    this.setState({
                        arrayOfFee: arr,
                        isFeeUpdated: 0
                    })
                }

            })
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.state.isFeeUpdated === 1) {
            // console.log("inside componentdidupdate and if");
            axios.post('/fee/addFinanceDeptFee', { theArray: this.state.arrayOfFee })
                .then((result) => {
                    if (result.data.message === "successful") {
                        console.log("Insertion of fee successful")
                    }
                    else if (result.data.message === "unsuccessful") {
                        console.log("Not inserted");
                    }
                })
                .catch(err => console.log("Error", err))
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
                arrayOfFee: theArray,
                isFeeUpdated: 1
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
                    <h3>Choose Fee Information File</h3>
                    <input type="file" onChange={this.onClick} />
                </div>
                <div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>Roll No.</th>
                                <th>Semester Number</th>
                                <th>department</th>
                                <th>semester fee transaction id</th>
                                <th>mess fee transaction id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrayOfFee.map((fee) => {
                                return (
                                    <tr>
                                        <th>{fee["name"]}</th>
                                        <td>{fee["roll_num"]}</td>
                                        <td>{fee["semester_num"]}</td>
                                        <th>{fee["department"]}</th>
                                        <td>{fee["semester_transaction_id_finance"]}</td>
                                        <td>{fee["mess_transaction_id_finance"]}</td>
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
