import React from 'react';
import Chart from 'react-google-charts';

const TradeChart = (props) => {
    return (
        <Chart
            width={'100%'}
            height={'500px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
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
            ]}
            options={{
                pointSize: 10,
                series: {
                    0: { pointShape: 'circle' }
                },
                chartArea: { width: "80%" },
                hAxis: {
                title: 'Time',
                },
                vAxis: {
                title: 'Stock Price',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default TradeChart;