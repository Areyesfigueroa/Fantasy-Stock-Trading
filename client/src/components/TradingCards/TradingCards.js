import React from 'react';
import TradingCard from './TradingCard/TradingCard';

const TradingCards = (props) => {
    return (
        <div>
            {props.data.map((el) => (
                <TradingCard 
                    key={el.id}
                    title={el.companyName}
                    subtitle={el.companySubtitle}
                    price={el.currentPrice}
                    percentage={el.percentChange}
                    daily={el.dailyGainLoss}
                />
            ))}
        </div>
    );
};

export default TradingCards;