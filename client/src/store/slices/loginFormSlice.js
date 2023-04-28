import { createSlice } from '@reduxjs/toolkit'
import { checkValidity, getFormElConfig } from '../../formValidation'

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
    errorMessage: ''
  },
  reducers: {
    updateInputConfig(state, action) {
      const { fieldName, options } = action.payload

      if (!fieldName) {
        console.error('Missing Field Name for login form configuration changes')
        return
      }

      if (options?.disableLabels) state.fields[fieldName].label = ''
      if (options?.disableHelperText) state.fields[fieldName].helperText = ''
    },
    updateLoginFormField(state, action) {
      // Update value
      const { fieldName, fieldValue } = action.payload
      state.fields[fieldName].value = fieldValue

      // Update field validity
      let { valid, error } = checkValidity(
        state.fields[fieldName].value,
        state.fields[fieldName].validation
      )
      state.fields[fieldName].valid = valid
      state.fields[fieldName].error = error

      // Update form validity
      state.valid = Object.keys(state.fields).every(
        (key) => state.fields[key].valid
      )
    }
  }
})

export const { updateLoginFormField, updateInputConfig } =
  loginFormSlice.actions
export const loginFormReducer = loginFormSlice.reducer
