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
    validateLoginFormFields(state) {
      state.valid = !Object.keys(state.fields).some((key) => {
        let { valid, error } = checkValidity(
          state.fields[key].value,
          state.fields[key].validation
        )
        state.fields[key].valid = valid
        state.fields[key].error = error

        return !valid
      })
    },
    updateLoginFormField(state, action) {
      const { fieldName, fieldValue } = action.payload
      state.fields[fieldName].value = fieldValue
    }
  }
})

export const {
  updateLoginFormField,
  validateLoginFormFields,
  updateInputConfig
} = loginFormSlice.actions
export const loginFormReducer = loginFormSlice.reducer
