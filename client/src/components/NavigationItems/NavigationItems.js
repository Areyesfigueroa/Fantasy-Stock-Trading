import React, {useContext} from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../../http';

const NavigationItems = () => {

    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    return (
        <Nav className="mr-sm-2">
            <NavigationItem link="/home">Home</NavigationItem>
            <NavigationItem link="/trade">Trade</NavigationItem>
            <NavigationItem link="/portfolio">Portfolio</NavigationItem>
            <NavDropdown title={userSession.session ? `Hi ${userSession.session.user.firstName}`: `My Account`} id="collasible-nav-dropdown">
               {userSession.session ? 
               <Button variant="light" style={{width: "100%"}} onClick={logoutUser}>LogOut</Button>:
               <NavigationItem link="/login" dropdownItem>{"Log in"}</NavigationItem>}
            </NavDropdown>
        </Nav>
    );
};

export default NavigationItems;