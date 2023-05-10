import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// TODO import reducer from slices
import {
  loginFormReducer,
  updateLoginFormField,
  updateLoginInputsConfig,
  validateLoginForm
} from './slices/loginFormSlice'
import {
  registerFormReducer,
  updateRegisterFormField,
  updateRegisterInputsConfig,
  validateRegisterForm
} from './slices/registerFormSlice'
import { userSessionReducer } from './slices/userSessionSlice'

// TODO import apis
import { authApi } from './apis/authAPI'

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    userSession: userSessionReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware)
  }
})

setupListeners(store.dispatch)

// Actions from slices
export {
  // Login
  updateLoginFormField,
  updateLoginInputsConfig,
  validateLoginForm,
  // Register
  updateRegisterFormField,
  updateRegisterInputsConfig,
  validateRegisterForm
}

// Redux Api generated hooks
export { useLoginMutation, useRegisterMutation } from './apis/authAPI'
