import React from 'react';
import CardItem from './CardItem/CardItem';
import classes from './CardBody.module.css';

const CardBody = (props) => {
    const cardStyle = {
        borderRight: "1px solid #ccc"
    };
    return (
        <div className={classes.CardBody}>
            {props.items.map((item, i) => (
                <CardItem 
                style={i+1 !== props.items.length ? cardStyle: null}
                key={`${i}-${item.subtitle}`}
                title={item.title} 
                subtitle={item.subtitle}
                variant={item.variant}
                compareTitle={item.compareTitle}
                compareValue={item.compareValue} />
            ))}
        </div>
    );
};

export default CardBody;