import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Input from '../Input/Input'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const LoginForm = ({
  style,
  submit,
  submitErrorMessage,
  formConfig,
  change,
  btnText
}) => {
  return (
    <Form style={style} onSubmit={submit}>
      {submitErrorMessage ? (
        <ErrorMessage>{submitErrorMessage}</ErrorMessage>
      ) : null}

      <Input inputConfig={formConfig.email} change={change} />
      <Input inputConfig={formConfig.password} change={change} />

      <Button variant='primary' type='submit'>
        {btnText ? btnText : 'Submit'}
      </Button>
    </Form>
  )
}

export default LoginForm
