import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import classes from './CardHeader.module.css';

const CardHeader = (props) => {
    return (
        <div className={classes.CardHeader}>
            <strong>{props.title}</strong>
            <InputGroup className="justify-content-end">
                <Button variant="outline-primary" onClick={props.handleShowBuyModal}>Buy</Button>
                <Button variant="outline-primary" onClick={props.handleShowSellModal}>Sell</Button>
            </InputGroup>
        </div>
    );
};

export default CardHeader;