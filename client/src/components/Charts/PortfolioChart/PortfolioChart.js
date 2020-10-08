import React from 'react';
import Chart from 'react-google-charts';

const PortfolioChart = (props) => {
    return (
        <Chart 
            width={"100%"}
            height={500}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Current Stock Value', 'Stock Value', { role: 'annotation' }],
                ['SPDR S&P 500 ETF Trust', 8175000, 8175000],
                ['SPDR Dow Jones Industrial Average ETF Trust', 3792000, 3792000],
                ['iShares Russell 2000 ETF', 2695000, 2695000]
            ]}
            options={{
                title: 'Current Stock Market',
                chartArea: { width: '80%' },
                hAxis: {
                    title: 'Company',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Stock Value',
                },
            }}
            legendToggle
        />
    );
};

export default PortfolioChart;