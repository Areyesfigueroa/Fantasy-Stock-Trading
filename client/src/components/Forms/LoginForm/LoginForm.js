import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';

const LoginForm = (props) => {
    return (
        <Form style={props.style} onSubmit={props.submit}>
            {props.submitErrorMessage ? <ErrorMessage>{props.submitErrorMessage}</ErrorMessage>: null}

            <Input inputConfig={props.formConfig.email} change={props.change} />
            <Input inputConfig={props.formConfig.password} change={props.change} />

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default LoginForm;