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
        <Form style={props.style} onSubmit={props.submit}>
            <Form.Group controlId={props.formConfig.email.id}>
                {props.disableLabels ? null: <Form.Label>Email address</Form.Label>}
                <Form.Control type="email" placeholder="Enter email" onChange={(event) => props.change(event)} />
                {formEmailText}
            </Form.Group>

            <Form.Group controlId={props.formConfig.fName.id}>
                {props.disableLabels ? null : <Form.Label>First Name</Form.Label>}
                <Form.Control type="text" placeholder="Enter First Name" onChange={(event) => props.change(event)}/>
            </Form.Group>

            <Form.Group controlId={props.formConfig.lName.id}>
                {props.disableLabels ? null : <Form.Label>Last Name</Form.Label>}
                <Form.Control type="text" placeholder="Enter Last Name" onChange={(event) => props.change(event)}/>
            </Form.Group>

            <Form.Group controlId={props.formConfig.password.id}>
                {props.disableLabels ? null: <Form.Label>Password</Form.Label>}
                <Form.Control type="password" placeholder="Enter Password" onChange={(event) => props.change(event)}/>
            </Form.Group>

            <Form.Group controlId={props.formConfig.retypePassword.id}>
                {props.disableLabels ? null : <Form.Label>Retype Password</Form.Label>}
                <Form.Control type="password" placeholder="Retype Password" onChange={(event) => props.change(event)}/>
            </Form.Group>

            <Form.Group controlId={props.formConfig.registerCheck.id}>
                <Form.Check type="checkbox" label="By checking you agree to our terms and policies" onChange={(event) => props.change(event)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default RegisterForm;