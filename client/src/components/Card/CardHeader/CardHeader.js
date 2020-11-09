import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import classes from './CardHeader.module.css';

const TradingCardHeader = (props) => {
    return (
        <div className={classes.CardHeader}>
            <strong>{props.title}</strong>

            <InputGroup className="justify-content-end">
                {props.buttonList.map((btn, i) => (
                    <Button key={`${i}-${btn.text}`} variant="outline-primary" onClick={btn.click}>{btn.text}</Button>
                ))}
            </InputGroup>
        </div>
    );
};

export default TradingCardHeader;