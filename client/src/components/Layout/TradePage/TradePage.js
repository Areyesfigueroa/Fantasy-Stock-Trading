import React from 'react';
import classes from './TradePage.module.css';

import Searchbar from '../../Searchbar/Searchbar';
import Title from '../../Title/Title';
import Container from 'react-bootstrap/Container';
import TradingCards from '../../TradingCards/TradingCards';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';


const TradePage = (props) => {
    const subtitleText = 'Search stock symbols and use fake money to trade on the live market and test your skills';
    
    return (
        <div className={classes.TradePage}>
            <Title subtitle={subtitleText}>Trade</Title>
            <Container>
                <Searchbar />
                {props.loading ? <LoadingSpinner /> : <TradingCards data={props.data}/>}
            </Container>
        </div>
    );
};

export default TradePage;