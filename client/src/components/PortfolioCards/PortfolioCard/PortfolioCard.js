import React from 'react';
import classes from './PortfolioCard.module.css';

import Card from '../../Card/Card';
import { getCardItemVariant, formatNumToCurrency } from '../../../utils';

const PortfolioCard = (props) => {

    const cardButtonList = [{ text: "Trade", click: () => props.trade(props.subtitle) }];

    const cardItems = [
        { 
            title: "Holding Value:", 
            subtitle: formatNumToCurrency(props.holdingValue), 
            variant: getCardItemVariant(props.holdingValue, props.prevHoldingValue),
            compareTitle: "Yesterday's Holding", 
            compareValue: formatNumToCurrency(props.prevHoldingValue)
        },
        { 
            title: "Shares:", 
            subtitle: props.shares 
        },
        { 
            title: "Last Price:", 
            subtitle: formatNumToCurrency(props.lastPrice), 
            variant: getCardItemVariant(props.lastPrice, props.prevPrice), 
            compareTitle: "Yesterday's Last Price", 
            compareValue: formatNumToCurrency(props.prevPrice)
        },
        { 
            title: "Percent Change:", 
            subtitle:  `${props.percentChange}%`, 
            variant: getCardItemVariant(props.percentChange, 0)
        }
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