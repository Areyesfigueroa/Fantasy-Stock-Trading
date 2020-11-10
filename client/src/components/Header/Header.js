import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Nav className="mr-auto">
                <NavigationItem link="/home" brand>Fantasy Stock Trading</NavigationItem>
                {/* <Navbar.Brand>Fantasy Stock Trading</Navbar.Brand> */}
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <NavigationItems />
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;