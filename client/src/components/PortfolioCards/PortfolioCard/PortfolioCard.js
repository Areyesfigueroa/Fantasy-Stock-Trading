import React from 'react';
import classes from './PortfolioCard.module.css';

import Card from '../../Card/Card';

const PortfolioCard = (props) => {

    const cardButtonList = [{ text: "Trade", click: () => props.trade(props.subtitle) }];

    const cardItems = [
        { title: "Holding Value:", subtitle: `$${props.holdingValue}` },
        { title: "Shares:", subtitle: props.shares },
        { title: "Last Price:", subtitle:  `$${props.lastPrice}` },
        { title: "Percent Change:", subtitle:  `${props.percentChange}%` }
    ];

    return (
        <div className={classes.PortfolioCard}>
            <Card 
            title={`${props.title}: ${props.subtitle}`}
            buttonList={cardButtonList}
            itemList={cardItems} />
        </div>
    );
};

export default PortfolioCard;