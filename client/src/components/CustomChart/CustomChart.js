import React from 'react';
import Chart from 'react-google-charts';

const CustomChart = (props) => {
    return (
        <Chart
            width={'100%'}
            height={'500px'}
            chartType={props.type}
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
                title: props.title,
                pointSize: 10,
                colors: ['#15A0C8'],
                series: {
                    0: { 
                        pointShape: 'circle',
                        curveType: 'function'
                     }
                },
                chartArea: { width: props.chartAreaWidth },
                hAxis: { title: props.hAxisTitle },
                vAxis: { title: props.vAxisTitle }
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default CustomChart;