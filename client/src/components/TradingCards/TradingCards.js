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
                    prevPrice={el.prevClosedPrice}
                    percentage={el.percentChange}
                    daily={el.dailyGainLoss}
                    sharesHeld={el.sharesHeld}
                    buy={props.buy}
                    sell={props.sell}
                />
            ))}
        </div>
    );
};

export default TradingCards;