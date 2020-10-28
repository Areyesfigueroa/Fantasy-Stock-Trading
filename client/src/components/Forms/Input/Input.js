import React, {Fragment} from 'react';
import Form from 'react-bootstrap/Form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Input = (props) => {
    const getInput = (type) => {
        if(type === 'checkbox') {
            return (
            <Form.Check 
                type="checkbox"
                className={props.inputConfig.error ? "is-invalid":""}
                name={props.inputConfig.name}
                label={props.inputConfig.label}
                defaultChecked={props.inputConfig.value}
                onChange={(event) => props.change(event)} />
            );
        } else {
            return (
            <Fragment>
                {props.inputConfig.label ? <Form.Label>{props.inputConfig.label}</Form.Label>:null}
                <Form.Control 
                    type={props.inputConfig.type} 
                    className={props.inputConfig.error ? "is-invalid":""} 
                    name={props.inputConfig.name} 
                    placeholder={props.inputConfig.placeholder} 
                    value={props.inputConfig.value} 
                    onChange={(event) => props.change(event)} />
            </Fragment>
            );
        }
    }
    return (
        <Form.Group controlId={props.inputConfig.id}>
            {getInput(props.inputConfig.type)}
            {!props.inputConfig.valid ? <ErrorMessage>{props.inputConfig.error}</ErrorMessage> : null}
            {props.inputConfig.helperText ? <Form.Text className="text-muted">{props.inputConfig.helperText}</Form.Text>: null}
        </Form.Group>
    );
};

export default Input;