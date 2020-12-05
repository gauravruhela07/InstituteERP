import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import history from './adminComponents/history'

import profile from "./adminComponents/profile";
import courseAssign from "./adminComponents/course";
import courseAdd from "./adminComponents/adminAddCourses";
import facultyAdd from "./adminComponents/adminAddFaculty";
import AdminLogin from "./adminComponents/adminLogin";
import adminLogout from "./adminComponents/adminLogout";
import uploadStudentData from "./adminComponents/uploadStudentData";
import uploadCourseData from "./adminComponents/uploadCourseData";
import uploadFeeData from "./adminComponents/uploadFeeData";
import HomePage from "../../homepage";
import uploadFacultyBio from './adminComponents/uploadFacultyBio';


const Admin = () => {
	return (
		<Router history={history}>
			<div className="container">
				<br />
				<Route path='/' exact component={HomePage} />
				<Route path='/admin' exact component={AdminLogin} />
				<Route path='/admin/profile' exact component={profile} />
				{/* <Route path='/admin/courseAssign' exact component={courseAssign} />
				<Route path='/admin/courseAdd' exact component={courseAdd} />
				<Route path='/admin/facultyAdd' exact component={facultyAdd} />
				<Route path='/admin/adminLogout' exact component={adminLogout} /> */}
				<Route path='/admin/uploadStudentData' exact component={uploadStudentData} />
				<Route path='/admin/uploadCourseData' exact component={uploadCourseData} />
				<Route path='/admin/uploadFeeData' exact component={uploadFeeData} />
				<Route path='/admin/uploadFacultyBio' exact component={uploadFacultyBio} />
				<Route path='/admin/adminLogout' exact component={adminLogout} />
			</div>
		</Router>
	);
}

export default Admin;