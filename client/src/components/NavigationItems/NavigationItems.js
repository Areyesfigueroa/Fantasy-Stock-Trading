import React, {useContext} from 'react';

import UserSessionContext from '../../context/UserSessionContext';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../../http';

const NavigationItems = () => {

    const userSession = useContext(UserSessionContext());

    return (
        <Nav className="mr-sm-2">
            <NavDropdown title={userSession.session ? `Hi ${userSession.session.user.first_name}`: `My Account`} id="collasible-nav-dropdown">
               {userSession.session ? 
               <Button variant="light" style={{width: "100%"}} onClick={logoutUser}>LogOut</Button>:
               <NavigationItem link="/login" dropdownItem>{"Log in"}</NavigationItem>}
            </NavDropdown>
            <NavigationItem link="/home">Home</NavigationItem>
            <NavigationItem link="/trade">Trade</NavigationItem>
            <NavigationItem link="/portfolio">Portfolio</NavigationItem>
        </Nav>
    );
};

export default NavigationItems;