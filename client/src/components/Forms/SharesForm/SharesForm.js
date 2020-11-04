import React from 'react';
import Form from 'react-bootstrap/Form'

const SharesForm = (props) => {
    return (
        <Form style={props.style}>
            <Form.Group controlId="sharesForm">
                <Form.Label>{`Number of shares at: $${props.price}`}</Form.Label>
                <Form.Control type="number" defaultValue={0} ref={props.inputRef}/>
            </Form.Group>
        </Form>
    );
};

export default SharesForm;