import React, { useEffect } from 'react'
import TradingCard from './TradingCard/TradingCard'
import {
  useFetchSavedShareUnitsQuery,
  useFetchStocksBySymbolQuery
} from '../../store'

const TradingCards = ({
  stockSymbols,
  buy,
  sell,
  handleLoading,
  handleError
}) => {
  return (
    <div>
      {stockSymbols.map((symbol) => {
        const {
          data: stocks,
          isFetching: stocksIsFetching,
          error: stocksError
        } = useFetchStocksBySymbolQuery(symbol)
        const {
          data: savedSharesUnit,
          isFetching: savedSharesUnitIsFetching,
          error: savedSharesUnitError
        } = useFetchSavedShareUnitsQuery(symbol)

        useEffect(() => {
          if (stocksIsFetching || savedSharesUnitIsFetching) {
            handleLoading(true)
          } else {
            handleLoading(false)
          }
        }, [stocksIsFetching, savedSharesUnitIsFetching])

        useEffect(() => {
          if (stocksError) {
            handleError(stocksError?.data?.errorMessage)
            return
          }

          if (savedSharesUnitError) {
            handleError(savedSharesUnitError?.data?.errorMessage)
            return
          }

          handleError('')
        }, [stocksError, savedSharesUnitError])

        if (stocksIsFetching || savedSharesUnitIsFetching) return null

        return (
          <TradingCard
            key={stocks.id}
            title={stocks.companyName}
            subtitle={stocks.symbol}
            price={stocks.currentPrice}
            prevPrice={stocks.prevClosedPrice}
            percentage={stocks.percentChange}
            daily={stocks.dailyGainLoss}
            sharesHeld={savedSharesUnit.sharesHeld}
            buy={buy}
            sell={sell}
          />
        )
      })}
    </div>
  )
}

export default TradingCards
