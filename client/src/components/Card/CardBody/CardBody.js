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
            {props.items.map((item, i) => (
                <CardItem 
                style={i+1 !== props.items.length ? cardStyle: { height: "90px" }} //last one is different 
                key={`${i}-${item.subtitle}`}
                title={item.title} 
                subtitle={item.subtitle} />
            ))}
        </div>
    );
};

export default CardBody;