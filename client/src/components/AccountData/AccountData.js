import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const AccountData = (props) => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header>
                <Card.Title>{props.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Account Balance: {props.balance}</ListGroup.Item>
                    <ListGroup.Item>Total Holding Value: {props.holdingValue}</ListGroup.Item>
                    <ListGroup.Item>Total Asset Value: {props.assetValue}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default AccountData;