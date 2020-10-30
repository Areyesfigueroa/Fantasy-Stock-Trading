import React, {useContext} from 'react';

import UserSessionContext from '../../context/UserSessionContext';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {

    const userSession = useContext(UserSessionContext());

    return (
        <Nav className="mr-sm-2">
            <NavigationItem link="/home">Home</NavigationItem>
            <NavigationItem link="/trade">Trade</NavigationItem>
            <NavigationItem link="/portfolio">Portfolio</NavigationItem>
            <NavDropdown title={userSession.session ? `Hi ${userSession.session.user.firstName}`: `My Account`} id="collasible-nav-dropdown">
                <NavigationItem link="/login" dropdownItem>{userSession.session ? "Log out": "Log in"}</NavigationItem>
            </NavDropdown>
        </Nav>
    );
};

export default NavigationItems;