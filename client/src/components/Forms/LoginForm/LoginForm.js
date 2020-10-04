import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {
    let formEmailText = (
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
    );

    if(props.disableFormText) formEmailText = null;

    return (
        <Form style={props.style}>
            <Form.Group controlId="loginEmail">
                {props.disableLabels ? null : <Form.Label>Email address</Form.Label>}
                <Form.Control type="email" placeholder="Enter email" />
                {formEmailText}
            </Form.Group>

            <Form.Group controlId="loginPassword">
                {props.disableLabels ? null : <Form.Label>Password</Form.Label>}
                <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default LoginForm;