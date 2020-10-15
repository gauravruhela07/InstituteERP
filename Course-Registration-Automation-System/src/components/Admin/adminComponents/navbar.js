import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">IIIT Guwahati</Link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">Profile</Link>
					</li>
					<li className="navbar-item">
						<Link to="/courseAssign" className="nav-link">Course Assign To Semester</Link>
					</li>
					<li className="navbar-item">
						<Link to="/courseAdd" className="nav-link">Course Addition</Link>
					</li>
					<li className="navbar-item">
						<Link to="/facultyAdd" className="nav-link">Faculty Addition</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;

