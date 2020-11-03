import React from 'react';
import classes from './TradePage.module.css';

import Searchbar from '../../Searchbar/Searchbar';
import Title from '../../Title/Title';
import Container from 'react-bootstrap/Container';
import TradingCard from '../../TradingCards/TradingCard/TradingCard';
import TradingCards from '../../TradingCards/TradingCards';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import CustomChart from '../../CustomChart/CustomChart';

const TradePage = (props) => {
    const subtitleText = 'Search stock symbols and use fake money to trade on the live market and test your skills';

    return (
        <div className={classes.TradePage}>
            <Title subtitle={subtitleText}>Trade</Title>
            <Container>
                <Searchbar search={props.search}/>
                
                {/* Display Search Results */}
                {props.loadingSearchResult ? <LoadingSpinner />:null}
                {props.searchResult ? 
                <TradingCard 
                    title={props.searchResult.companyName}
                    subtitle={props.searchResult.symbol}
                    price={props.searchResult.currentPrice}
                    percentage={props.searchResult.percentChange}
                    daily={props.searchResult.dailyGainLoss}
                /> : null}

                {/* Chart */}
                {props.stockHistoryChart && props.searchResult ? 
                <CustomChart 
                    type="AreaChart"
                    title={`Daily Prices For ${props.searchResult.symbol} on ${props.stockHistoryChart.date}`}
                    data={props.stockHistoryChart.chartData}
                    chartAreaWidth={"70%"}
                    hAxisTitle={"Time"}
                    vAxisTitle={"Price"}
                /> : null}
                {props.loadingStocks ? <LoadingSpinner />:<TradingCards data={props.stocks} />}
            </Container>
        </div>
    );
};

export default TradePage;