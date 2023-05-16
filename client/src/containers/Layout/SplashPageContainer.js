import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SplashPage from '../../components/Layout/SplashPage/SplashPage'

const SplashPageContainer = () => {
  const [showLoginForm, setLoginForm] = useState(true)
  const [showRegisterForm, setRegisterForm] = useState(false)

  const FORM_NAV_KEYS = {
    login: 'login-form',
    register: 'register-form'
  }

  const handleForm = (eventKey) => {
    if (eventKey === FORM_NAV_KEYS.login) {
      setLoginForm(true)
      setRegisterForm(false)
    } else if (eventKey === FORM_NAV_KEYS.register) {
      setLoginForm(false)
      setRegisterForm(true)
    }
  }

  const appendModalFooter = () => {
    const style = { marginRight: 'auto' }
    if (showLoginForm) {
      return (
        <p style={style}>
          Not a member? <NavLink to={'/login'}>Sign Up</NavLink>
        </p>
      )
    }
    if (showRegisterForm) {
      return (
        <p style={style}>
          Already have an account? <NavLink to={'/login'}>Log In</NavLink>
        </p>
      )
    }
    return null
  }

  return (
    <SplashPage
      showLoginForm={showLoginForm}
      showRegisterForm={showRegisterForm}
      handleForm={handleForm}
      modalFooter={appendModalFooter}
    />
  )
}

export default SplashPageContainer
