import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import Navbar from "./adminComponents/navbar";
import profile from "./adminComponents/profile";
import courseAssign from "./adminComponents/course";
import courseAdd from "./adminComponents/adminAddCourses";
import facultyAdd from "./adminComponents/adminAddFaculty";



const Admin = () => {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Route path='/' exact component={profile} />
				<Route path='/courseAssign' exact component={courseAssign} />
				<Route path='/courseAdd' exact component={courseAdd} />
				<Route path='/facultyAdd' exact component={facultyAdd} />
			</div>
		</Router>
	);
}

export default Admin;