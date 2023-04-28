import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// TODO import reducer from slices
import {
  loginFormReducer,
  updateLoginFormField,
  updateInputConfig
} from './slices/loginFormSlice'
import { userSessionReducer } from './slices/userSessionSlice'

// TODO import apis
import { authApi } from './apis/authAPI'

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    userSession: userSessionReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware)
  }
})

setupListeners(store.dispatch)

// Actions from slices
export { updateLoginFormField, updateInputConfig }

// Redux Api generated hooks
export { useLoginMutation } from './apis/authAPI'
