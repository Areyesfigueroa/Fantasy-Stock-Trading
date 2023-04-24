import React, { useState, useEffect, useContext } from 'react'

import UserSessionContext from '../../context/UserSessionContext'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from '../../components/Forms/LoginForm/LoginForm'
import { loginUser } from '../../http'

import {
  updateInputConfig,
  updateLoginFormField,
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

  const dispatch = useDispatch()

  const { loginForm } = useSelector((store) => store)

  const [submitErrorMessage, setSubmitErrorMessage] = useState('')

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
    loginUser(loginForm.email.value, loginForm.fields.password.value)
      .then((res) => {
        userSession.setSession(res)
        history.push('/portfolio')
        history.go(0)
      })
      .catch((error) => {
        setSubmitErrorMessage(error.message)
        console.error(error.message)
      })
  }, [loginForm, history, userSession])

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
        submitErrorMessage={submitErrorMessage}
        submit={handleSubmit}
        change={handleChange}
      />
    </div>
  )
}

export default LoginFormContainer
