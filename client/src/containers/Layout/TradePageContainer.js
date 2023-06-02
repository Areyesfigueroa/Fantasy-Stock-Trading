import React, { useEffect } from 'react'

import TradePage from '../../components/Layout/TradePage/TradePage'
import Toast from '../../components/Toast/Toast'
import ToastErrorTitle from '../../components/Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle'
import ToastTransactionTitle from '../../components/Toast/ToastTitles/ToastTransactionTitle/ToastTransactionTitle'
import useToast from '../../hooks/useToast'

import { formatNumToCurrency } from '../../utils'
import {
  useBuySharesMutation,
  useFetchBalanceQuery,
  useLogoutMutation,
  useSellSharesMutation
} from '../../store'

const TradePageContainer = () => {
  const toast = useToast()

  const [buyShares, buySharesResult] = useBuySharesMutation()
  const [sellShares, sellSharesResult] = useSellSharesMutation()
  const [logout, logoutResult] = useLogoutMutation()

  const { refetch: refetchPortfolio } = useFetchBalanceQuery()

  useEffect(() => {
    if (buySharesResult.isSuccess || sellSharesResult.isSuccess) {
      refetchPortfolio()
    }

    if (buySharesResult.data?.hasExpired || sellSharesResult.data?.hasExpired) {
      logout()
      return
    }

    if (buySharesResult.isError || sellSharesResult.isError) {
      toast.handleShow(<ToastErrorTitle />, 'Error Occurred')
    }
  }, [buySharesResult, sellSharesResult])

  useEffect(() => {
    if (logoutResult.isError) {
      toast.handleShow(<ToastErrorTitle />, 'Error Occurred')
    }
  }, [logoutResult])

  const handleBuyShares = (symbol, shareUnits, unitPrice) => {
    buyShares({ symbol, shareUnits, unitPrice })

    const toastTotal = formatNumToCurrency(
      parseInt(shareUnits) * parseFloat(unitPrice)
    )
    const toastMsg = `Successfully purchased ${shareUnits} shares from ${symbol} for a total of ${toastTotal}`
    toast.handleShow(<ToastTransactionTitle />, toastMsg)
  }

  const handleSellShares = async (symbol, shareUnits, unitPrice) => {
    sellShares({ symbol, shareUnits, unitPrice })

    const toastTotal = formatNumToCurrency(
      parseInt(shareUnits) * parseFloat(unitPrice)
    )
    const toastMsg = `Successfully sold ${shareUnits} shares from ${symbol} for a total of ${toastTotal}`
    toast.handleShow(<ToastTransactionTitle />, toastMsg)
  }

  return (
    <div>
      <Toast show={toast.show} close={toast.handleClose} title={toast.title}>
        {toast.message}
      </Toast>
      <TradePage buy={handleBuyShares} sell={handleSellShares} />
    </div>
  )
}

export default TradePageContainer
