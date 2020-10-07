import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavigationItems from '../NavigationItems/NavigationItems';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Nav className="mr-auto">
                <Navbar.Brand href="#home">Fantasy Stock Trading</Navbar.Brand>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <NavigationItems />
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;