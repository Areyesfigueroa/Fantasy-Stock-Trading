import React from 'react';
import CardBS from 'react-bootstrap/Card';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';

const Card = (props) => {
    return (
        <CardBS style={{ width: "100%" }}>
            <CardBS.Title>
                <CardHeader title={props.title} buttonList={props.buttonList} />
            </CardBS.Title>
            <CardBS.Body>
                <CardBody items={props.itemList}/>
            </CardBS.Body>
        </CardBS>
    );
};

export default Card;