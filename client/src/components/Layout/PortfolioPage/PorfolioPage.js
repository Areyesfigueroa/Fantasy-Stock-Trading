import React from 'react';
import Title from '../../Title/Title';
import Container from 'react-bootstrap/Container';
import PortfolioCard from '../../PortfolioCard/PortfolioCard';
import CustomChart from '../../CustomChart/CustomChart';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const PorfolioPage = (props) => {
    const subtitle="Each account starts with $100,000 fake dollars, see how much money you can earn by trading stocks";
    return (
        <div>
            <Title subtitle={subtitle}>Portfolio</Title>
            <Container>
               <PortfolioCard 
               title="Account Information"
               balance={props.accountBalance}
               holdingValue={props.totalHoldingValue}
               assetValue={props.totalAssetValue} />
               
               {props.loadingChart ? 
               <LoadingSpinner /> : 
               <CustomChart 
                    type="ColumnChart"
                    title="Portfolio Holdings"
                    data={props.holdingsChart}
                    chartAreaWidth={"80%"}
                    hAxisTitle={"Company"}
                    vAxisTitle={"Stock Value"}
                />}

                

            </Container>
        </div>
    );
};

export default PorfolioPage;