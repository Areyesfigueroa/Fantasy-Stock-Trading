import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterForm = (props) => {
    let formEmailText = (
        <Form.Text className="text-muted">
        We'll never share your email with anyone else.
        </Form.Text>
    )

    if(props.disableFormText) formEmailText = null;

    return (
        <Form style={props.style}>
            <Form.Group controlId="formEmail">
                {props.disableLabels ? null: <Form.Label>Email address</Form.Label>}
                <Form.Control type="email" placeholder="Enter email" />
                {formEmailText}
            </Form.Group>

            <Form.Group controlId="formFirstName">
                {props.disableLabels ? null : <Form.Label>First Name</Form.Label>}
                <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group controlId="formLastName">
                {props.disableLabels ? null : <Form.Label>Last Name</Form.Label>}
                <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group controlId="formPassword">
                {props.disableLabels ? null: <Form.Label>Password</Form.Label>}
                <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>

            <Form.Group controlId="formRetypePassword">
                {props.disableLabels ? null : <Form.Label>Retype Password</Form.Label>}
                <Form.Control type="password" placeholder="Retype Password" />
            </Form.Group>

            <Form.Group controlId="registerCheck">
                <Form.Check type="checkbox" label="By checking you agree to our terms and policies" />
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default RegisterForm;