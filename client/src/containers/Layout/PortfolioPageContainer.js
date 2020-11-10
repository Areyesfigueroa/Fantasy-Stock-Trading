import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import PortfolioPage from '../../components/Layout/PortfolioPage/PorfolioPage';
import { getSavedStocks, logoutUser } from '../../http';
import { formatNumToCurrency } from '../../utils';

const PortfolioPageContainer = () => {
    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    const [portfolioHoldings, setPortfolioHoldings] = useState(null);
    const [portfolioHoldingsChart, setPorfolioHoldingsChart] = useState(null);
    const [loading, setLoading] = useState(true);

    const [accountBalance, setAccountBalance] = useState(100000);
    const [totalHoldingValue, setTotalHoldingValue] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);

    useEffect(() => {
        if (!userSession.session) history.push('/login');
        initStocksData();
    }, []);

    const initStocksData = async () => {
        try {
            const savedStocks = await getSavedStocks();
            if(savedStocks.hasExpired) logoutUser();

            const portfolioChart = savedStocks.map(stock => [stock.companyName, stock.holdingValue, stock.holdingValue]);
            portfolioChart.unshift(['Current Stock Value', 'Stock Value', { role: 'annotation' }]);

            setPortfolioHoldings(savedStocks);
            setPorfolioHoldingsChart(portfolioChart);
            setAccountInfo(savedStocks);
            setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    const setAccountInfo = (stocks) => {
        let totalHoldings = 0;
        stocks.forEach(stock => {
            totalHoldings += stock.holdingValue;
        });

        let totalBalance = accountBalance - totalHoldings;
        let totalAssets = totalBalance + totalHoldings;

        setTotalHoldingValue(formatNumToCurrency(totalHoldings));
        setAccountBalance(formatNumToCurrency(totalBalance));
        setTotalAssetValue(formatNumToCurrency(totalAssets));
    }

    const trade = (companySymbol) => {
        history.push({
            pathname: '/trade',
            search: `?q=${companySymbol}`
        });
    }

    return (
        <PortfolioPage
            accountBalance={accountBalance}
            totalHoldingValue={totalHoldingValue}
            totalAssetValue={totalAssetValue}
            holdings={portfolioHoldings}
            holdingsChart={portfolioHoldingsChart}
            loading={loading}
            trade={trade}
        />
    );
};

export default PortfolioPageContainer;