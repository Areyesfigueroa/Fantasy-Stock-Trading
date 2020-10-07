import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className="nav-item">
            <NavLink 
            to={props.link} 
            className={props.dropdownItem ? "dropdown-item":"nav-link" }
            activeClassName="active">
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;