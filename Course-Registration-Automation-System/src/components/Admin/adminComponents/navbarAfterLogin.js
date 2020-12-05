import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import AdminLogout from './adminLogout';
import history from './history';


export default class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="#">IIIT Guwahati</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link to="/admin/profile" className="nav-link">Profile</Link>
					</li>
					<li className="nav-item active">
						<Link to="/admin/uploadStudentData" className="nav-link">Add Student Info</Link>
					</li>
					<li className="nav-item active">
						<Link to="/admin/uploadCourseData" className="nav-link">Add Course Info</Link>
					</li>
					<li className="nav-item active">
						<Link to="/admin/uploadFeeData" className="nav-link">Add Fee Info</Link>
					</li>
					<li className="nav-item active">
						<Link to="/admin/uploadFacultyBio" className="nav-link">Add Faculty Bio</Link>
					</li>
					</ul>
					<form className="form-inline my-2 my-lg-0">
						{/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
						<Link to="/admin/adminLogout" className="nav-link">Logout</Link>
					</form>
				</div>
			</nav>
		)

	}
}
