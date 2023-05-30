import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const portfolioApi = createApi({
  reducerPath: 'portfolio',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/portfolio',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.userSession?.sessionId

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  tagTypes: ['Portfolio'],
  endpoints: (builder) => ({
    fetchBalance: builder.query({
      providesTags: ['Portfolio'],
      query: () => ({
        url: '/balance',
        method: 'GET'
      })
    })
  })
})

export const { useFetchBalanceQuery } = portfolioApi
export { portfolioApi }
