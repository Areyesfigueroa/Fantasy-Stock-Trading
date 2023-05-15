import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const stocksApi = createApi({
  reducerPath: 'stocks',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/stocks',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.userSession?.sessionId

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    fetchSavedStocks: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET'
      })
    })
  })
})

export const { useFetchSavedStocksQuery } = stocksApi
export { stocksApi }
