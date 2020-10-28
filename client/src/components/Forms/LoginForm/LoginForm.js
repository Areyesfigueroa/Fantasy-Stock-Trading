import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';

const LoginForm = (props) => {
    let formEmailText = (
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
    );

    if(props.disableFormText) formEmailText = null;

    return (
        <Form style={props.style}>
            <Input inputConfig={props.formConfig.email} change={props.change} />
            <Input inputConfig={props.formConfig.password} change={props.change} />

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default LoginForm;