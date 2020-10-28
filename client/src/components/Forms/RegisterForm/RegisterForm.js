import React from 'react';

import Form from 'react-bootstrap/Form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from 'react-bootstrap/Button';
import Input from '../Input/Input';

const RegisterForm = (props) => {
    return (
        <Form style={props.style} onSubmit={props.submit}>
            {props.submitErrorMessage ? <ErrorMessage>{props.submitErrorMessage}</ErrorMessage>: null}
            
            <Input inputConfig={props.formConfig.email} change={props.change}/>
            <Input inputConfig={props.formConfig.fName} change={props.change}/>
            <Input inputConfig={props.formConfig.lName} change={props.change}/>
            <Input inputConfig={props.formConfig.password} change={props.change}/>
            <Input inputConfig={props.formConfig.retypePassword} change={props.change}/>
            <Input inputConfig={props.formConfig.registerCheck} change={props.change}/>

            <Button variant="primary" type="submit">
                {props.btnText ? props.btnText : "Submit"}
            </Button>
        </Form>
    );
};

export default RegisterForm;