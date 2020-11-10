import React from 'react';
import PortfolioCard from './PortfolioCard/PortfolioCard';

const PortfolioCards = (props) => {
    return (
        <div>
            {props.data.map((el, i) => (
                <PortfolioCard
                key={`${i}-${el.companySymbol}`}
                title={el.companyName}
                subtitle={el.companySymbol}
                holdingValue={el.holdingValue}
                prevHoldingValue={el.prevHoldingValue}
                shares={el.shares}
                lastPrice={el.lastPrice}
                prevPrice={el.prevClosedPrice}
                percentChange={el.percentChange}
                trade={props.trade} />
            ))}
        </div>
    );
};

export default PortfolioCards;