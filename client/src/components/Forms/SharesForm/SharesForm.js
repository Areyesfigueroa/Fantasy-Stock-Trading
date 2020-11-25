import React from 'react';
import Form from 'react-bootstrap/Form'

const SharesForm = (props) => {
    return (
        <Form style={props.style}>
            <Form.Group controlId="sharesForm">
                <Form.Label style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 3px"}}>
                        <div>{`Number of shares at: $${props.price}`}</div>
                        <div>{`Current Shares Held: ${props.shares}`}</div>
                    </div>
                </Form.Label>
                <Form.Control type="number" min={0} defaultValue={0} ref={props.inputRef}/>
            </Form.Group>
        </Form>
    );
};

export default SharesForm;