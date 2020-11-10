import React from 'react';
import classes from './CardItem.module.css';

const CardItem = (props) => {
    let variantClass=''
    let subtitle=props.subtitle;
    let compareValue=props.compareValue;
    if(props.variant) {
        variantClass = props.variant === "success" ? classes.success: classes.danger;
        subtitle = props.variant === "success" ? `+${props.subtitle}`: props.subtitle;
        compareValue = props.variant === "success" ? `${props.compareValue}`: props.compareValue
    }

    return (
        <div className={classes.CardItem} style={props.style}>
            <strong>{props.title}</strong>
            <p className={variantClass}>{subtitle}</p>
            {props.compareTitle ? 
            <p className={`${classes.small} ${variantClass}`}>{`${props.compareTitle}: ${compareValue}`}</p>:null}
        </div>
    );
};

export default CardItem;