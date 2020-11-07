import React from 'react';
import TradingCard from './TradingCard/TradingCard';

const TradingCards = (props) => {
    return (
        <div>
            {props.data.map((el) => (
                <TradingCard 
                    key={el.id}
                    title={el.companyName}
                    subtitle={el.symbol}
                    price={el.currentPrice}
                    percentage={el.percentChange}
                    daily={el.dailyGainLoss}
                    buy={props.buy}
                    sell={props.sell}
                />
            ))}
        </div>
    );
};

export default TradingCards;