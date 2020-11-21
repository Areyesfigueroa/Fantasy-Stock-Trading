const getData = (symbol='TSLA') => {
    const data = {
        "symbol": symbol,
        "companyName": "Tesla, Inc.",
        "primaryExchange": "NASDAQ",
        "calculationPrice": "close",
        "open": 497.89,
        "openTime": 1605882600795,
        "openSource": "official",
        "close": 489.61,
        "closeTime": 1605906000508,
        "closeSource": "official",
        "high": 502.5,
        "highTime": 1605920399392,
        "highSource": "15 minute delayed price",
        "low": 489.06,
        "lowTime": 1605905979070,
        "lowSource": "15 minute delayed price",
        "latestPrice": 489.61,
        "latestSource": "Close",
        "latestTime": "November 20, 2020",
        "latestUpdate": 1605906000508,
        "latestVolume": 32914619,
        "iexRealtimePrice": null,
        "iexRealtimeSize": null,
        "iexLastUpdated": null,
        "delayedPrice": 490.5,
        "delayedPriceTime": 1605920399392,
        "oddLotDelayedPrice": 489.53,
        "oddLotDelayedPriceTime": 1605905995980,
        "extendedPrice": 490.5,
        "extendedChange": 0.89,
        "extendedChangePercent": 0.00182,
        "extendedPriceTime": 1605920399392,
        "previousClose": 499.27,
        "previousVolume": 62475346,
        "change": -9.66,
        "changePercent": -0.01935,
        "volume": 32914619,
        "iexMarketPercent": null,
        "iexVolume": null,
        "avgTotalVolume": 34491122,
        "iexBidPrice": null,
        "iexBidSize": null,
        "iexAskPrice": null,
        "iexAskSize": null,
        "iexOpen": null,
        "iexOpenTime": null,
        "iexClose": 489.13,
        "iexCloseTime": 1605905997661,
        "marketCap": 464101808610,
        "peRatio": 864.73,
        "week52High": 508.61,
        "week52Low": 65.42,
        "ytdChange": 4.670349,
        "lastTradeTime": 1605906000266,
        "isUSMarketOpen": false
    };
    
    return data;
}



module.exports = {
    getData
}