export const getHoldingCharts = (stocks) => {
  const chart = stocks.map((stock) => [
    stock.companyName,
    stock.holdingValue,
    stock.holdingValue
  ])
  chart.unshift(['Current Stock Value', 'Stock Value', { role: 'annotation' }])

  return chart
}

export const getTotalHoldingValue = (stocks) =>
  stocks.reduce((accum, stock) => {
    accum += stock?.holdingValue
    return accum
  }, 0)

export const getTotalAssetValue = (totalHoldingValue, accountBalance) => {
  return totalHoldingValue + accountBalance
}
