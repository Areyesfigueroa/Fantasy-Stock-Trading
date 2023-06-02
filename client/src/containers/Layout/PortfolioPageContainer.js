import React, { useEffect } from 'react'

import PortfolioPage from '../../components/Layout/PortfolioPage/PorfolioPage'
import Toast from '../../components/Toast/Toast'
import ToastErrorTitle from '../../components/Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle'
import useToast from '../../hooks/useToast'
import {
  useFetchBalanceQuery,
  useFetchSavedStocksQuery,
  useLogoutMutation
} from '../../store/index'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const PortfolioPageContainer = () => {
  const toast = useToast()

  const {
    data: balanceData,
    error: balanceError,
    isFetching: balanceIsFetching
  } = useFetchBalanceQuery()

  const {
    data: savedStocksData,
    error: savedStocksError,
    isFetching: savedStocksIsFetching
  } = useFetchSavedStocksQuery()

  const [logout, logoutResults] = useLogoutMutation()

  // Update toast errors
  useEffect(() => {
    if (balanceError) {
      toast.handleShow(<ToastErrorTitle />, 'Total Balance not found')
    }

    if (savedStocksError) {
      toast.handleShow(<ToastErrorTitle />, 'Saved Stocks not found')
    }

    if (logoutResults?.error?.data?.errorMessage) {
      toast.handleShow(
        <ToastErrorTitle />,
        logoutResults?.error?.data?.errorMessage
      )
    }
  }, [balanceError, savedStocksError, logoutResults])

  if (balanceError || savedStocksError) {
    return <div>Error Occurred</div>
  }

  if (balanceIsFetching || savedStocksIsFetching) {
    return <LoadingSpinner />
  }

  if (savedStocksData?.hasExpired || balanceData?.hasExpired) {
    logout()
    return <LoadingSpinner />
  }

  return (
    <div>
      <Toast show={toast.show} close={toast.handleClose}>
        {toast.message}
      </Toast>
      <PortfolioPage
        accountBalance={Number.parseInt(balanceData.account_balance, 10)}
        savedStocks={savedStocksData}
      />
    </div>
  )
}

export default PortfolioPageContainer
