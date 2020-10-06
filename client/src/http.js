const dummyData = {
    companyName: "SPDR S&P 500 ETF Trust",
    companySubtitle: "SPY",
    currentPrice: 133,
    percentChange: .949,
    dailyGainLoss: -3.2
}

const fetchFakeData = async (count) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let arr = [];
            for (let i = 0; i < count; i++) {
                arr.push({id: i, ...dummyData});
            }
            resolve(arr);
        }, 1000);
    });
}

export { fetchFakeData }