import React from 'react';
import classes from './CardItem.module.css';

const CardItem = (props) => {
    return (
        <div className={classes.CardItem} style={props.style}>
            <strong>{props.title}</strong>
            <p>{props.subtitle}</p>
        </div>
    );
};

export default CardItem;