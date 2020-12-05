import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminLogout extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
    };

    render() {
        return (
            <div>
                <h3>You have successfully logged out</h3>
                <Link to='/admin'>Login Again</Link>
            </div>
        )
    }

}