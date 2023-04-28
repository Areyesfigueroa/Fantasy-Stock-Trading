import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../apis/authAPI'

const USER_SESSION_NAME = 'userSession'

const initialState =
  localStorage.getItem(USER_SESSION_NAME) !== null
    ? JSON.parse(localStorage.getItem(USER_SESSION_NAME))
    : null

const userSessionSlice = createSlice({
  name: USER_SESSION_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (_, { payload }) => {
        // Save session within localStorage
        localStorage.setItem(USER_SESSION_NAME, JSON.stringify(payload))

        // Save session within state
        return payload
      }
    )
  }
})

export const userSessionReducer = userSessionSlice.reducer
