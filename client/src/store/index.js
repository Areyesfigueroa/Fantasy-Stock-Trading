import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// TODO import reducer from slices
import {
  loginFormReducer,
  updateLoginFormField,
  validateLoginFormFields,
  updateInputConfig
} from './slices/loginFormSlice'
// TODO import apis

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
  }
})

setupListeners(store.dispatch)

export { updateLoginFormField, validateLoginFormFields, updateInputConfig }
