import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Input = ({ inputConfig, change }) => {
  const getInput = (type) => {
    if (type === 'checkbox') {
      return (
        <Form.Check
          type='checkbox'
          className={inputConfig.error ? 'is-invalid' : ''}
          name={inputConfig.name}
          label={inputConfig.label}
          defaultChecked={inputConfig.value}
          onChange={(event) => change(event)}
        />
      )
    } else {
      return (
        <Fragment>
          {inputConfig.label ? (
            <Form.Label>{inputConfig.label}</Form.Label>
          ) : null}
          <Form.Control
            type={inputConfig.type}
            className={inputConfig.error ? 'is-invalid' : ''}
            name={inputConfig.name}
            placeholder={inputConfig.placeholder}
            value={inputConfig.value}
            onChange={(event) => change(event)}
          />
        </Fragment>
      )
    }
  }
  return (
    <Form.Group controlId={inputConfig.id}>
      {getInput(inputConfig.type)}
      {!inputConfig.valid ? (
        <ErrorMessage>{inputConfig.error}</ErrorMessage>
      ) : null}
      {inputConfig.helperText ? (
        <Form.Text className='text-muted'>{inputConfig.helperText}</Form.Text>
      ) : null}
    </Form.Group>
  )
}

export default Input
