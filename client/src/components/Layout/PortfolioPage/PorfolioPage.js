import React from 'react'
import { useHistory } from 'react-router'
import Title from '../../Title/Title'
import Container from 'react-bootstrap/Container'
import AccountData from '../../AccountData/AccountData'
import CustomChart from '../../CustomChart/CustomChart'
import PortfolioCards from '../../PortfolioCards/PortfolioCards'
import { formatNumToCurrency } from '../../../utils'
import {
  getHoldingCharts,
  getTotalAssetValue,
  getTotalHoldingValue
} from '../../../utils/portfolio'

const PorfolioPage = ({ accountBalance, savedStocks }) => {
  const history = useHistory()

  const formattedAccountBalance = formatNumToCurrency(accountBalance)
  const holdingsChart = getHoldingCharts(savedStocks)

  const totalHoldingsValue = getTotalHoldingValue(savedStocks)
  const formattedTotalHoldingsValue = formatNumToCurrency(totalHoldingsValue)

  const totalAssetValue = getTotalAssetValue(totalHoldingsValue, accountBalance)
  const formattedTotalAssetValue = formatNumToCurrency(totalAssetValue)

  const handleTrade = (companySymbol) => {
    history.push({
      pathname: '/trade',
      search: `?q=${companySymbol}`
    })
  }

  return (
    <div>
      <Title subtitle='Each account starts with $100,000 fake dollars, see how much money you can earn by trading stocks'>
        Portfolio
      </Title>
      <Container>
        <AccountData
          title='Account Information'
          balance={formattedAccountBalance}
          holdingValue={formattedTotalHoldingsValue}
          assetValue={formattedTotalAssetValue}
        />
        {holdingsChart?.length > 1 ? (
          <CustomChart
            type='ColumnChart'
            title='Portfolio Holdings'
            data={holdingsChart}
            chartAreaWidth={'80%'}
            hAxisTitle={'Company'}
            vAxisTitle={'Stock Value'}
          />
        ) : (
          <p>No Share Units Purchased</p>
        )}
        {!!savedStocks?.length && (
          <PortfolioCards data={savedStocks} trade={handleTrade} />
        )}
      </Container>
    </div>
  )
}

export default PorfolioPage
