import React from 'react'

import Form from 'react-bootstrap/Form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from 'react-bootstrap/Button'
import Input from '../Input/Input'

const RegisterForm = ({
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
      <Input inputConfig={formConfig.firstName} change={change} />
      <Input inputConfig={formConfig.lastName} change={change} />
      <Input inputConfig={formConfig.password} change={change} />
      <Input inputConfig={formConfig.retypePassword} change={change} />
      <Input inputConfig={formConfig.registerCheck} change={change} />

      <Button variant='primary' type='submit'>
        {btnText ? btnText : 'Submit'}
      </Button>
    </Form>
  )
}

export default RegisterForm
