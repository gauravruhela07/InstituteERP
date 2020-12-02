import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';


export default class NavbarClass extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">HomePage</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/student/home">About</Nav.Link>
                        <Nav.Link href="/student/course_registration">Registration</Nav.Link>
                        <Nav.Link href="/student/change_password">Change Password</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/student/logout">LogOut</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
