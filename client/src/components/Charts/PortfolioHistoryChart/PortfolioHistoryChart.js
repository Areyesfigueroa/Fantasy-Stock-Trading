import React from 'react';
import Chart from 'react-google-charts';

const PortfolioHistoryChart = (props) => {
    return (
        <Chart
            width={'100%'}
            height={'500px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Date', 'Portfolio History'],
                ['Sept 30', 0],
                ['Oct 01', 10],
                ['Oct 02', 23],
                ['Oct 05', 17],
                ['Oct 06', 18],
                ['Oct 07', 9]
            ]}
            options={{
                pointSize: 10,
                series: {
                    0: { pointShape: 'circle' }
                },
                chartArea: { width: "70%" },
                hAxis: {
                title: 'Date',
                },
                vAxis: {
                title: 'Portfolio History',
                },
                series: {
                    0: { curveType: 'function' },
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default PortfolioHistoryChart;