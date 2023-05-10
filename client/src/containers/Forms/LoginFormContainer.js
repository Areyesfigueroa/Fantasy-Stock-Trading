import React, { useEffect } from 'react'

import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from '../../components/Forms/LoginForm/LoginForm'

import {
  updateLoginInputsConfig,
  updateLoginFormField,
  useLoginMutation,
  validateLoginForm
} from '../../store/index'

const LoginFormContainer = ({
  style,
  disableLabels,
  disableHelperText,
  disableFormText,
  btnText
}) => {
  const history = useHistory()

  const [login, loginResults] = useLoginMutation()

  const dispatch = useDispatch()
  const { loginForm, userSession } = useSelector((store) => store)

  useEffect(() => {
    if (!disableLabels && !disableHelperText) return

    const initInputConfigs = [
      {
        fieldName: loginForm.fields.email.name,
        options: {
          disableLabels,
          disableHelperText
        }
      },
      {
        fieldName: loginForm.fields.password.name,
        options: {
          disableLabels
        }
      }
    ]

    dispatch(updateLoginInputsConfig(initInputConfigs))
  }, [])

  useEffect(() => {
    if (loginResults.isSuccess && !!userSession) {
      history.push('/portfolio')
    }
  }, [loginResults, userSession])

  const handleChange = (event) => {
    dispatch(
      updateLoginFormField({
        fieldName: event.target.name,
        fieldValue: event.target.value
      })
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!loginForm.valid && !loginForm.submitErrorMessage) {
      // We also revalidate on submission to avoid
      // not validating when we have not made any changes to the input fields.
      dispatch(validateLoginForm())
      return
    }

    const { email, password } = loginForm.fields
    login({ email: email.value, password: password.value })
  }

  return (
    <div>
      <LoginForm
        style={style}
        disableLabels={disableLabels}
        disableFormText={disableFormText}
        btnText={btnText}
        formConfig={loginForm.fields}
        submitErrorMessage={loginForm.submitErrorMessage}
        submit={handleSubmit}
        change={handleChange}
      />
    </div>
  )
}

export default LoginFormContainer
