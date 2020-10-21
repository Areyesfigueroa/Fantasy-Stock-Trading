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
                <Form.Control type="email" className={props.formConfig.email.error ? "is-invalid":""} placeholder="Enter email" value={props.formConfig.email.value} onChange={(event) => props.change(event)} />
                {!props.formConfig.email.valid ? <small className="text-danger">{props.formConfig.email.error}</small> : null}
                {formEmailText}
            </Form.Group>

            <Form.Group controlId={props.formConfig.fName.id}>
                {props.disableLabels ? null : <Form.Label>First Name</Form.Label>}
                <Form.Control type="text" className={props.formConfig.fName.error ? "is-invalid":""} placeholder="Enter First Name" value={props.formConfig.fName.value} onChange={(event) => props.change(event)}/>
                {props.formConfig.fName.error ? <small className="text-danger">{props.formConfig.fName.error}</small> : null}
            </Form.Group>

            <Form.Group controlId={props.formConfig.lName.id}>
                {props.disableLabels ? null : <Form.Label>Last Name</Form.Label>}
                <Form.Control type="text" className={props.formConfig.lName.error ? "is-invalid":""} placeholder="Enter Last Name" value={props.formConfig.lName.value} onChange={(event) => props.change(event)}/>
                {props.formConfig.lName.error ? <small className="text-danger">{props.formConfig.lName.error}</small> : null}
            </Form.Group>

            <Form.Group controlId={props.formConfig.password.id}>
                {props.disableLabels ? null: <Form.Label>Password</Form.Label>}
                <Form.Control type="password" className={props.formConfig.password.error ? "is-invalid":""} placeholder="Enter Password" value={props.formConfig.password.value} onChange={(event) => props.change(event)}/>
                {props.formConfig.password.error ? <small className="text-danger">{props.formConfig.password.error}</small> : null}
            </Form.Group>

            <Form.Group controlId={props.formConfig.retypePassword.id}>
                {props.disableLabels ? null : <Form.Label>Retype Password</Form.Label>}
                <Form.Control type="password" className={props.formConfig.retypePassword.error ? "is-invalid":""} placeholder="Retype Password" value={props.formConfig.retypePassword.value} onChange={(event) => props.change(event)}/>
                {props.formConfig.retypePassword.error ? <small className="text-danger">{props.formConfig.retypePassword.error}</small> : null}
            </Form.Group>

            <Form.Group controlId={props.formConfig.registerCheck.id}>
                <Form.Check type="checkbox" className={props.formConfig.registerCheck.error ? "is-invalid":""} label="By checking you agree to our terms and policies" defaultChecked={props.formConfig.registerCheck.value} onChange={(event) => props.change(event)} />
                {props.formConfig.registerCheck.error ? <small className="text-danger">{props.formConfig.registerCheck.error}</small> : null}
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default RegisterForm;