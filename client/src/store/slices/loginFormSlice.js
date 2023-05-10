import { createSlice } from '@reduxjs/toolkit'
import { getFormElConfig } from '../../formValidation'
import {
  updateInputsConfig,
  updateFormField,
  validateForm
} from '../services/reducers'
import { authApi } from '../apis/authAPI'

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState: {
    fields: {
      email: getFormElConfig(
        'email',
        'login-email',
        'email',
        'Email Address',
        'Enter Email',
        "We'll never share your email with anyone else."
      ),
      password: getFormElConfig(
        'password',
        'login-password',
        'password',
        'Password',
        'Enter Password'
      )
    },
    valid: false,
    submitErrorMessage: ''
  },
  reducers: {
    updateLoginInputsConfig: updateInputsConfig,
    updateLoginFormField: updateFormField,
    validateLoginForm: validateForm
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.submitErrorMessage = payload.error.data.errorMessage
      }
    )
  }
})

export const {
  updateLoginFormField,
  updateLoginInputsConfig,
  validateLoginForm
} = loginFormSlice.actions
export const loginFormReducer = loginFormSlice.reducer
