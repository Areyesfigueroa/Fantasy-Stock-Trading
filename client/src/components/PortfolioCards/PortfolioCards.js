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
                shares={el.shares}
                lastPrice={el.lastPrice}
                percentChange={el.percentChange}
                trade={props.trade} />
            ))}
        </div>
    );
};

export default PortfolioCards;