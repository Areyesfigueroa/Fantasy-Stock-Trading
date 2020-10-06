import React from 'react';
import CardItem from './CardItem/CardItem';
import classes from './CardBody.module.css';

const CardBody = (props) => {
    const cardStyle = {
        height: "90px",
        borderRight: "1px solid #ccc"
    };
    return (
        <div className={classes.CardBody}>
            <CardItem style={cardStyle} title={"Current Price:"} subtitle={`$${props.price}`}/>
            <CardItem style={cardStyle} title={"Percent Change:"} subtitle={`${props.percentage}%`}/>
            <CardItem style={{ height: "90px" }} title={"Daily Gain/Loss:"} subtitle={`$${props.daily}`}/>
        </div>
    );
};

export default CardBody;