import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import TradePage from '../../components/Layout/TradePage/TradePage'
import Toast from '../../components/Toast/Toast'
import ToastErrorTitle from '../../components/Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle'
import ToastTransactionTitle from '../../components/Toast/ToastTitles/ToastTransactionTitle/ToastTransactionTitle'
import useToast from '../../hooks/useToast'

import { formatNumToCurrency } from '../../utils'
import {
  searchBySymbol,
  getStockHistory,
  buyCompanyShares,
  sellCompanyShares,
  logoutUser,
  getSavedShareUnits
} from '../../http'

const TradePageContainer = () => {
  const history = useHistory()
  const toast = useToast()

  const [searchResult, setSearchResult] = useState(null)
  const [stockHistory, setStockHistory] = useState(null)
  const [loadingSearchRes, setLoadingSearchRes] = useState(false)

  useEffect(() => {
    if (!history.location.search) return

    const params = new URLSearchParams(history.location.search)
    handleSearch(params.get('q'))
  }, [])

  const setSearchRes = async (searchTerm) => {
    try {
      const res = await searchBySymbol('')
      const { sharesHeld } = await getSavedShareUnits(searchTerm)
      res.sharesHeld = sharesHeld

      setSearchResult(res)
    } catch (error) {
      setSearchResult(null)
      throw error
    }
  }

  // TODO: Transfer this over to trade page
  const setStockHistoryRes = async (searchTerm) => {
    try {
      const res = await getStockHistory(searchTerm)

      let chartData = res.map((el) => [el.time, el.price])
      chartData.unshift(['Time', searchTerm.toUpperCase()])

      setStockHistory({ date: res[0].date, chartData })
    } catch (error) {
      setStockHistory(null)
      throw error
    }
  }

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm === '')
        throw new Error('Search failed: searchbar is empty')
      setLoadingSearchRes(true)
      await setSearchRes(searchTerm)
      await setStockHistoryRes(searchTerm)
      setLoadingSearchRes(false)
    } catch (error) {
      toast.handleShow(<ToastErrorTitle />, error.message)
    }
  }

  const addShareUnits = (sharesHeld, shareUnits) => {
    return sharesHeld + shareUnits
  }

  const reduceShareUnits = (sharesHeld, shareUnits) => {
    return sharesHeld - shareUnits
  }

  const updateSharesHeld = (symbol, shareUnits, callback) => {
    if (searchResult && searchResult.id === symbol) {
      const searchResultCopy = { ...searchResult }
      searchResultCopy.sharesHeld = callback(
        parseInt(searchResultCopy.sharesHeld),
        parseInt(shareUnits)
      )

      setSearchResult(searchResultCopy)
    } else {
      const newSavedStocks = savedStocks.map((stock) => {
        if (stock.id === symbol) {
          const stockCopy = { ...stock }
          stockCopy.sharesHeld = callback(
            parseInt(stockCopy.sharesHeld),
            parseInt(shareUnits)
          )

          return stockCopy
        }

        return stock
      })

      setSavedStocks(newSavedStocks)
    }
  }

  const buyShares = async (symbol, shareUnits, unitPrice) => {
    try {
      const response = await buyCompanyShares(symbol, shareUnits, unitPrice)
      if (response.hasExpired) await logoutUser()

      updateSharesHeld(symbol, shareUnits, addShareUnits)

      const toastTotal = formatNumToCurrency(
        parseInt(shareUnits) * parseFloat(unitPrice)
      )
      const toastMsg = `Successfully purchased ${shareUnits} shares from ${symbol} for a total of ${toastTotal}`
      toast.handleShow(<ToastTransactionTitle />, toastMsg)
    } catch (error) {
      toast.handleShow(<ToastErrorTitle />, error.message)
    }
  }

  const sellShares = async (symbol, shareUnits, unitPrice) => {
    try {
      const response = await sellCompanyShares(symbol, shareUnits, unitPrice)
      if (response.hasExpired) await logoutUser()

      updateSharesHeld(symbol, shareUnits, reduceShareUnits)

      const toastTotal = formatNumToCurrency(
        parseInt(shareUnits) * parseFloat(unitPrice)
      )
      const toastMsg = `Successfully sold ${shareUnits} shares from ${symbol} for a total of ${toastTotal}`
      toast.handleShow(<ToastTransactionTitle />, toastMsg)
    } catch (error) {
      toast.handleShow(<ToastErrorTitle />, error.message)
    }
  }

  return (
    <div>
      <Toast show={toast.show} close={toast.handleClose} title={toast.title}>
        {toast.message}
      </Toast>
      <TradePage
        search={handleSearch}
        searchResult={searchResult}
        stockHistoryChart={stockHistory}
        loadingSearchRes={loadingSearchRes}
        buy={buyShares}
        sell={sellShares}
      />
    </div>
  )
}

export default TradePageContainer
