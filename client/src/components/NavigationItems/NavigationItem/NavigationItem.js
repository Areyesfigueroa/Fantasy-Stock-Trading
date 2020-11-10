import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    const classes = [];

    classes.push(props.dropdownItem ? "dropdown-item":"nav-link");
    if(props.brand) classes.push("navbar-brand");
    return (
        <li className="nav-item">
            <NavLink 
            to={props.link} 
            className={classes.join(' ')}
            activeClassName="active">
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;