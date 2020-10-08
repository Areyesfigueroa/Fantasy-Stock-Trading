import React from 'react';
import Title from '../Title/Title';
import Container from 'react-bootstrap/Container';
// import TradeChart from './TradeChart/TradeChart';
import PortfolioHistoryChart from './PortfolioHistoryChart/PortfolioHistoryChart';

const Charts = (props) => {

    return (
        <div>
            <Title subtitle="Testing Google Chart Library">Pie Chart</Title>
            <Container>
                {/* <TradeChart /> */}
                <PortfolioHistoryChart />
            </Container>
        </div>
    );
};

export default Charts;