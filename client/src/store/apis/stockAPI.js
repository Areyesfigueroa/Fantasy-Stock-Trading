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
  tagTypes: ['ShareUnits'],
  endpoints: (builder) => ({
    fetchSavedStocks: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET'
      })
    }),
    fetchStocksBySymbol: builder.query({
      query: (symbol) => ({
        url: `/search/${symbol}`,
        method: 'GET'
      })
    }),
    fetchStockHistory: builder.query({
      query: (symbol) => ({
        url: `/search/${symbol}/history`,
        method: 'GET'
      })
    }),
    fetchSavedShareUnits: builder.query({
      providesTags: ['ShareUnits'],
      query: (symbol) => ({
        url: `/${symbol}`,
        method: 'GET'
      })
    }),
    buyShares: builder.mutation({
      invalidatesTags: ['ShareUnits'],
      query: ({ symbol, shareUnits, unitPrice }) => ({
        url: '/transaction/buy',
        method: 'POST',
        body: { symbol, shareUnits, unitPrice }
      })
    }),
    sellShares: builder.mutation({
      invalidatesTags: ['ShareUnits'],
      query: ({ symbol, shareUnits, unitPrice }) => ({
        url: '/transaction/sell',
        method: 'POST',
        body: { symbol, shareUnits, unitPrice }
      })
    })
  })
})

export const {
  useFetchSavedStocksQuery,
  useFetchStocksBySymbolQuery,
  useFetchStockHistoryQuery,
  useFetchSavedShareUnitsQuery,
  useBuySharesMutation,
  useSellSharesMutation
} = stocksApi
export { stocksApi }
