import React from 'react';
import Title from '../../Title/Title';
import Container from 'react-bootstrap/Container';
import PortfolioCard from '../../PortfolioCard/PortfolioCard';

const PorfolioPage = (props) => {
    const subtitle="Each account starts with $100,000 fake dollars, see how much money you can earn by trading stocks";
    return (
        <div>
            <Title subtitle={subtitle}>Portfolio</Title>
            <Container>
               <PortfolioCard 
               title="Account Information"
               balance={`$63,347.91`}
               holdingValue={`$37,630.16`}
               assetValue={`$100,978.07`} />
            </Container>
        </div>
    );
};

export default PorfolioPage;