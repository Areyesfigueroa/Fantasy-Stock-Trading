const formatStockData = (res) => {
    const data = {
        id: res.data.symbol,
        companyName: res.data.companyName,
        symbol: res.data.symbol,
        currentPrice: res.data.latestPrice,
        prevClosedPrice: res.data.previousClose,
        percentChange: (res.data.changePercent * 100).toFixed(3),
        dailyGainLoss: res.data.change
    };
    return data;
}

module.exports = { formatStockData }