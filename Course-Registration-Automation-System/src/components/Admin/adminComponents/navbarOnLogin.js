import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="https://www.iiitg.ac.in/" className="navbar-brand">IIIT Guwahati</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

