import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (body) => {
          return {
            url: '/login',
            method: 'POST',
            body
          }
        }
      }),
      register: builder.mutation({
        query: (body) => {
          return {
            url: '/register',
            method: 'POST',
            body
          }
        }
      })
    }
  }
})

export const { useLoginMutation, useRegisterMutation } = authApi
export { authApi }
