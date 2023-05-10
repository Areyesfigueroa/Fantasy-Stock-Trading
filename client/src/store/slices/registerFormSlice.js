import { createSlice } from '@reduxjs/toolkit'
import { getFormElConfig } from '../../formValidation'

import {
  updateInputsConfig,
  updateFormField,
  validateForm
} from '../services/reducers'
import { authApi } from '../apis/authAPI'

const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState: {
    fields: {
      email: getFormElConfig(
        'email',
        'register-email',
        'email',
        'Email Address',
        'Enter Email',
        "We'll never share your email with anyone else."
      ),
      firstName: getFormElConfig(
        'text',
        'first-name',
        'firstName',
        'First Name',
        'Enter First Name'
      ),
      lastName: getFormElConfig(
        'text',
        'last-name',
        'lastName',
        'Last Name',
        'Enter Last Name'
      ),
      password: getFormElConfig(
        'password',
        'register-password',
        'password',
        'Password',
        'Enter Password'
      ),
      retypePassword: getFormElConfig(
        'password',
        'retype-password',
        'retypePassword',
        'Retype Password',
        'Retype Password'
      ),
      registerCheck: getFormElConfig(
        'checkbox',
        'register-check',
        'registerCheck',
        'By checking you agree to our terms and policies',
        '',
        '',
        false
      )
    },
    valid: false,
    submitErrorMessage: ''
  },
  reducers: {
    updateRegisterInputsConfig: updateInputsConfig,
    updateRegisterFormField: updateFormField,
    validateRegisterForm: validateForm
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, { payload }) => {
        state.submitErrorMessage = payload.data.errorMessage
      }
    )
  }
})

export const {
  updateRegisterFormField,
  updateRegisterInputsConfig,
  validateRegisterForm
} = registerFormSlice.actions
export const registerFormReducer = registerFormSlice.reducer
