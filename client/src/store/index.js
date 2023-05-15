import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Reducers from slices
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

// Redux Toolkit APIs
import { authApi } from './apis/authAPI'
import { portfolioApi } from './apis/portfolioAPI'
import { stocksApi } from './apis/stockAPI'

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    userSession: userSessionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(portfolioApi.middleware)
      .concat(stocksApi.middleware)
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
export { useFetchBalanceQuery } from './apis/portfolioAPI'
export { useFetchSavedStocksQuery } from './apis/stockAPI'
