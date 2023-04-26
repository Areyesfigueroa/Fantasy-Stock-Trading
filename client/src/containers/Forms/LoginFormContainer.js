import React, { useEffect, useContext } from 'react'

import UserSessionContext from '../../context/UserSessionContext'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from '../../components/Forms/LoginForm/LoginForm'

import {
  updateInputConfig,
  updateLoginFormField,
  useLoginMutation,
  validateLoginFormFields
} from '../../store/index'

const LoginFormContainer = ({
  style,
  disableLabels,
  disableHelperText,
  disableFormText,
  btnText
}) => {
  const history = useHistory()
  const userSession = useContext(UserSessionContext())

  const [login, loginResults] = useLoginMutation()

  const dispatch = useDispatch()
  const { loginForm } = useSelector((store) => store)

  useEffect(() => {
    if (!disableLabels && !disableHelperText) return
    dispatch(
      updateInputConfig({
        fieldName: loginForm.fields.email.name,
        options: {
          disableLabels: disableLabels,
          disableHelperText: disableHelperText
        }
      })
    )
    dispatch(
      updateInputConfig({
        fieldName: loginForm.fields.password.name,
        options: {
          disableLabels: disableLabels
        }
      })
    )
  }, [])

  useEffect(() => {
    if (!loginForm.valid) return

    const { email, password } = loginForm.fields
    login({ email: email.value, password: password.value })
  }, [loginForm, login])

  useEffect(() => {
    // TODO: Handle user session using redux
    if (loginResults.status === 'fulfilled') {
      userSession.setSession(loginResults.data)
      history.push('/portfolio')
      history.go(0)
    }
  }, [loginResults, history, userSession])

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
    dispatch(validateLoginFormFields())
  }

  return (
    <div>
      <LoginForm
        style={style}
        disableLabels={disableLabels}
        disableFormText={disableFormText}
        btnText={btnText}
        formConfig={loginForm.fields}
        submitErrorMessage={loginResults?.error?.data?.errorMessage ?? ''}
        submit={handleSubmit}
        change={handleChange}
      />
    </div>
  )
}

export default LoginFormContainer
