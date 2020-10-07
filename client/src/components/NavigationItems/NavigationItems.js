import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <Nav className="mr-sm-2">
            <NavigationItem link="/home">Home</NavigationItem>
            <NavigationItem link="/trade">Trade</NavigationItem>
            <NavigationItem link="/portfolio">Portfolio</NavigationItem>
            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                <NavigationItem link="/login" dropdownItem>LogOut</NavigationItem>
            </NavDropdown>
        </Nav>
    );
};

export default NavigationItems;