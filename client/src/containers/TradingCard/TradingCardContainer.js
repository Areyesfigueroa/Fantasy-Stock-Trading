import React from 'react';
import TradingCard from '../../components/TradingCards/TradingCard/TradingCard';

const TradingCardContainer = (props) => {
    return (
        <TradingCard 
        key={props.id}
        title={props.companyName}
        subtitle={props.symbol}
        price={props.currentPrice}
        prevPrice={props.prevClosedPrice}
        percentage={props.percentChange}
        daily={props.dailyGainLoss}
        buy={props.buy}
        sell={props.sell} />
    );
};

export default TradingCardContainer;