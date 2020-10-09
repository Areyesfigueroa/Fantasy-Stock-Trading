import React from 'react';
import Title from '../Title/Title';
import Container from 'react-bootstrap/Container';
import CustomChart from '../CustomChart/CustomChart';

const Charts = (props) => {
    const porfolioHoldingsData = [
        ['Current Stock Value', 'Stock Value', { role: 'annotation' }],
        ['SPDR S&P 500 ETF Trust', 8175000, 8175000],
        ['SPDR Dow Jones Industrial Average ETF Trust', 3792000, 3792000],
        ['iShares Russell 2000 ETF', 2695000, 2695000]
    ];
    const currTradeData=[
        ['time', 'Stock Price'],
        ['9 am', 0],
        ['10 am', 10],
        ['11 am', 23],
        ['12 pm', 17],
        ['1 pm', 18],
        ['2 pm', 9],
        ['3 pm', 11],
        ['4 pm', 27],
        ['5 pm', 33],
        ['6 pm', 40],
        ['7 pm', 32],
        ['8 pm', 35]
    ];
    const portfolioHistoryData = [
        ['Date', 'Portfolio History'],
        ['Sept 30', 0],
        ['Oct 01', 10],
        ['Oct 02', 23],
        ['Oct 05', 17],
        ['Oct 06', 18],
        ['Oct 07', 9]
    ];
    return (
        <div>
            <Title subtitle="Testing Google Chart Library">Pie Chart</Title>
            <Container>
                <CustomChart 
                    type="ColumnChart"
                    title="Portfolio Holdings"
                    data={porfolioHoldingsData}
                    chartAreaWidth={"80%"}
                    hAxisTitle={"Company"}
                    vAxisTitle={"Stock Value"}
                />
                <CustomChart 
                    type="LineChart"
                    title="Current Stock Market"
                    data={currTradeData}
                    chartAreaWidth={"80%"}
                    hAxisTitle={"Time"}
                    vAxisTitle={"Stock Value"}
                />
                <CustomChart 
                    type="AreaChart"
                    title="Portfolio History"
                    data={portfolioHistoryData}
                    chartAreaWidth={"70%"}
                    hAxisTitle={"Data"}
                    vAxisTitle={"Stock Value"}
                />
            </Container>
        </div>
    );
};

export default Charts;