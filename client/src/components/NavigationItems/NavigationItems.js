import React, {useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationItem from './NavigationItem/NavigationItem';

import useLocalStorage from '../../hooks/useLocalStorage';

const NavigationItems = () => {

    const [userSession, setUserSession] = useLocalStorage('userSession', null);

    useEffect(() => {
        console.log(userSession);
    });

    return (
        <Nav className="mr-sm-2">
            <NavigationItem link="/home">Home</NavigationItem>
            <NavigationItem link="/trade">Trade</NavigationItem>
            <NavigationItem link="/portfolio">Portfolio</NavigationItem>
            <NavDropdown title={userSession ? `Hi ${userSession.user.firstName}`: `My Account`} id="collasible-nav-dropdown">
                <NavigationItem link="/login" dropdownItem>{userSession ? "Log out": "Log in"}</NavigationItem>
            </NavDropdown>
        </Nav>
    );
};

export default NavigationItems;