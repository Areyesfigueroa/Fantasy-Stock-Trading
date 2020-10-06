import React from 'react';
import CardItem from './CardItem/CardItem';
import classes from './TradingCard.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const TradingCard = (props) => {
    const cardStyle = {
        height: "90px",
        borderRight: "1px solid #ccc"
    }
    return (
        <div className={classes.TradingCard}>
            <Card style={{ width: "100%" }}>
                <Card.Title>
                    <div className={classes.cardTitle} >
                        <strong>{`SPDR S&P 500 ETF Trust: SPY`}</strong>
                        <InputGroup className="justify-content-end">
                            <Button variant="outline-primary">Buy</Button>
                            <Button variant="outline-primary">Sell</Button>
                        </InputGroup>
                    </div>
                </Card.Title>
                <Card.Body>
                    <div className={classes.container}>
                        <CardItem style={cardStyle} title={"Current Price:"} subtitle={`$${133}`}/>
                        <CardItem style={cardStyle} title={"Percent Change:"} subtitle={`${-0.949}%`}/>
                        <CardItem style={{ height: "90px" }} title={"Daily Gain/Loss:"} subtitle={`$${-3.20}`}/>
                    </div>
                </Card.Body>
            </Card>
            
        </div>
    );
};

export default TradingCard;