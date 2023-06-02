import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import classes from './TradePage.module.css'

import Searchbar from '../../Searchbar/Searchbar'
import Title from '../../Title/Title'
import Container from 'react-bootstrap/Container'
import TradingCard from '../../TradingCards/TradingCard/TradingCard'
import TradingCards from '../../TradingCards/TradingCards'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import CustomChart from '../../CustomChart/CustomChart'
import Toast from '../../Toast/Toast'
import useToast from '../../../hooks/useToast'
import ToastErrorTitle from '../../Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle'
import {
  useFetchSavedShareUnitsQuery,
  useFetchStockHistoryQuery,
  useFetchStocksBySymbolQuery
} from '../../../store'

const TradePage = ({ buy, sell }) => {
  const history = useHistory()
  const toast = useToast()

  const [searchTerm, setSearchTerm] = useState('')
  const [tradeCardLoading, setTradeCardLoading] = useState(true)
  const [tradeCardError, setTradeCardError] = useState('')
  const [formattedStocksHistory, setFormattedStocksHistory] = useState()

  const searchStocksData = useFetchStocksBySymbolQuery(searchTerm)
  const searchSavedSharesData = useFetchSavedShareUnitsQuery(searchTerm)
  const searchStocksHistoryChartData = useFetchStockHistoryQuery(searchTerm)

  const subtitleText =
    'Search stock symbols and use fake money to trade on the live market and test your skills'

  const defaultStocks = ['SPY', 'DIA', 'IWM']

  useEffect(() => {
    if (!history.location.search) return

    const params = new URLSearchParams(history.location.search)
    setSearchTerm(params.get('q'))
  }, [])

  useEffect(() => {
    if (!searchStocksHistoryChartData.data) return
    const { data } = searchStocksHistoryChartData
    const chartData = data.map((el) => [el.time, el.price])
    chartData.unshift(['Time', searchTerm.toUpperCase()])

    setFormattedStocksHistory({ date: data[0].date, chartData })
  }, [searchStocksHistoryChartData])

  useEffect(() => {
    if (tradeCardError) {
      toast.handleShow(<ToastErrorTitle />, tradeCardError)
    }

    if (searchTerm && searchStocksData.error) {
      toast.handleShow(
        <ToastErrorTitle />,
        searchStocksData.error.data.errorMessage
      )
    }

    if (searchTerm && searchSavedSharesData.error) {
      toast.handleShow(
        <ToastErrorTitle />,
        searchSavedSharesData.error.data.errorMessage
      )
    }

    if (searchTerm && searchStocksHistoryChartData.error) {
      toast.handleShow(
        <ToastErrorTitle />,
        searchSavedSharesData.error.data.errorMessage
      )
    }
  }, [tradeCardError, searchSavedSharesData.error, searchStocksData.error])

  return (
    <div className={classes.TradePage}>
      <Toast show={toast.show} close={toast.handleClose} title={toast.title}>
        {toast.message}
      </Toast>
      <Title subtitle={subtitleText}>Trade</Title>
      <Container>
        <Searchbar search={setSearchTerm} />

        {/* Display Search Results */}
        {(searchStocksData.isFetching || searchSavedSharesData.isFetching) && (
          <LoadingSpinner />
        )}
        {searchStocksData.data &&
          !searchStocksData?.error &&
          !searchSavedSharesData?.error && (
            <>
              <TradingCard
                title={searchStocksData.data.companyName}
                subtitle={searchStocksData.data.symbol}
                price={searchStocksData.data.currentPrice}
                prevPrice={searchStocksData.data.prevClosedPrice}
                percentage={searchStocksData.data.percentChange}
                daily={searchStocksData.data.dailyGainLoss}
                sharesHeld={searchSavedSharesData.data.sharesHeld}
                buy={buy}
                sell={sell}
              />

              {searchStocksHistoryChartData.data &&
                !searchStocksHistoryChartData?.error &&
                formattedStocksHistory && (
                  <CustomChart
                    type='AreaChart'
                    title={`Daily Prices For ${searchStocksData.data.symbol} on ${formattedStocksHistory.date}`}
                    data={formattedStocksHistory.chartData}
                    chartAreaWidth={'70%'}
                    hAxisTitle={'Time'}
                    vAxisTitle={'Price'}
                  />
                )}
            </>
          )}

        {/* Default Recommendations */}
        <p>Other Recommendations</p>
        {tradeCardLoading && <LoadingSpinner />}
        <TradingCards
          stockSymbols={defaultStocks}
          buy={buy}
          sell={sell}
          handleLoading={setTradeCardLoading}
          handleError={setTradeCardError}
        />
      </Container>
    </div>
  )
}

export default TradePage
