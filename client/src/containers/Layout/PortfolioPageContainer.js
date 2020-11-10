import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import PortfolioPage from '../../components/Layout/PortfolioPage/PorfolioPage';
import { getSavedStocks, logoutUser, searchBySymbol } from '../../http';

const PortfolioPageContainer = () => {
    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    const [portfolioHoldings, setPortfolioHoldings] = useState(null);
    const [portfolioHoldingsChart, setPorfolioHoldingsChart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userSession.session) history.push('/login');
        initStocksData();

    }, []);

    const initStocksData = async () => {
        try {
            const stocksRes = await getSavedStocks();
            if (stocksRes.hasExpired) logoutUser();

            let portfolioHoldingsTemp = [];
            for (let i = 0; i < stocksRes.length; i++) {
                const searchRes = await searchBySymbol(stocksRes[i].company_symbol);
                portfolioHoldingsTemp.push({
                    companyName: searchRes.companyName,
                    companySymbol: stocksRes[i].company_symbol,
                    holdingValue: stocksRes[i].share_units * searchRes.currentPrice,
                    shares: stocksRes[i].share_units,
                    lastPrice: searchRes.currentPrice,
                    percentChange: searchRes.percentChange
                });
            }

            const portfolioChart = portfolioHoldingsTemp.map(stock => [stock.companyName, stock.holdingValue, stock.holdingValue]);
            portfolioChart.unshift(['Current Stock Value', 'Stock Value', { role: 'annotation' }]);

            setPortfolioHoldings(portfolioHoldingsTemp);
            setPorfolioHoldingsChart(portfolioChart);
            setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    const trade = (companySymbol) => {
        history.push({
            pathname: '/trade',
            search: `?q=${companySymbol}`
        });
    }

    return (
        <PortfolioPage
            accountBalance={100000}
            totalHoldingValue={0}
            totalAssetValue={0}
            holdings={portfolioHoldings}
            holdingsChart={portfolioHoldingsChart}
            loading={loading}
            trade={trade}
        />
    );
};

export default PortfolioPageContainer;