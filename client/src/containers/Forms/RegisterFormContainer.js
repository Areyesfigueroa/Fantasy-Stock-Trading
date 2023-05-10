import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm'
import { useHistory } from 'react-router-dom'
import {
  validateRegisterForm,
  updateRegisterInputsConfig,
  updateRegisterFormField,
  useRegisterMutation
} from '../../store/index'

const RegisterFormContainer = ({
  style,
  disableLabels,
  disableHelperText,
  disableFormText,
  btnText
}) => {
  const history = useHistory()

  const [register, registerResults] = useRegisterMutation()

  const dispatch = useDispatch()
  const { registerForm, userSession } = useSelector((store) => store)

  useEffect(() => {
    if (!disableLabels && !disableHelperText) return

    const initInputConfigs = [
      {
        fieldName: registerForm.fields.email.name,
        options: { disableLabels, disableHelperText }
      },
      {
        fieldName: registerForm.fields.firstName.name,
        options: { disableLabels }
      },
      {
        fieldName: registerForm.fields.lastName.name,
        options: { disableLabels }
      },
      {
        fieldName: registerForm.fields.password.name,
        options: { disableLabels }
      },
      {
        fieldName: registerForm.fields.retypePassword.name,
        options: { disableLabels }
      }
    ]

    dispatch(updateRegisterInputsConfig(initInputConfigs))
  }, [])

  useEffect(() => {
    if (registerResults.isSuccess && !!userSession) {
      history.push('/portfolio')
    }
  }, [registerResults])

  const handleChange = (event) => {
    // We validate during input changes
    dispatch(
      updateRegisterFormField({
        fieldName: event.target.name,
        fieldValue: event.target.value
      })
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!registerForm.valid && !registerForm.submitErrorMessage) {
      // We also revalidate on submission to avoid
      // not validating when we have not made any changes to the input fields.
      dispatch(validateRegisterForm())
      return
    }

    const { fields } = registerForm

    register({
      email: fields.email.value,
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      password: fields.password.value,
      retypePassword: fields.retypePassword.value,
      termsCheck: fields.registerCheck.value
    })
  }

  return (
    <RegisterForm
      style={style}
      disableLabels={disableLabels}
      disableFormText={disableFormText}
      btnText={btnText}
      formConfig={registerForm.fields}
      submitErrorMessage={registerForm.submitErrorMessage}
      submit={handleSubmit}
      change={handleChange}
    />
  )
}

export default RegisterFormContainer
