import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import Navbar from "./adminComponents/navbar";
import profile from "./adminComponents/profile";
import course from "./adminComponents/course";
import faculty from "./adminComponents/facultyAddCourses";



const Admin = () => {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Route path='/' exact component={profile} />
				<Route path='/course' exact component={course} />
				<Route path='/faculty' exact component={faculty} />
			</div>
		</Router>
	);
}

export default Admin;