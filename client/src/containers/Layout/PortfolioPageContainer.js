import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import PortfolioPage from '../../components/Layout/PortfolioPage/PorfolioPage';
import Toast from '../../components/Toast/Toast';
import ToastErrorTitle from '../../components/Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle';
import useToast from '../../hooks/useToast';
import { getSavedStocks, logoutUser, getAccountBalance } from '../../http';
import { formatNumToCurrency } from '../../utils';

let _isMounted = true;
const PortfolioPageContainer = () => {
    const history = useHistory();
    const toast = useToast();

    const [portfolioHoldings, setPortfolioHoldings] = useState(null);
    const [portfolioHoldingsChart, setPorfolioHoldingsChart] = useState(null);
    const [loading, setLoading] = useState(true);

    const [accountBalance, setAccountBalance] = useState(0);
    const [totalHoldingValue, setTotalHoldingValue] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);

    useEffect(() => {
        _isMounted = true;
        initStocksData();

        return function cleanup() {
            _isMounted = false;
        }
    }, []);

    const initStocksData = async () => {
        try {
            if(!_isMounted) return;
            const savedStocks = await getSavedStocks();
            if(savedStocks.hasExpired) logoutUser();

            const portfolioChart = savedStocks.map(stock => [stock.companyName, stock.holdingValue, stock.holdingValue]);
            portfolioChart.unshift(['Current Stock Value', 'Stock Value', { role: 'annotation' }]);

            if(!_isMounted) return;
            setPortfolioHoldings(savedStocks);
            setPorfolioHoldingsChart(portfolioChart);
            await setAccountInfo(savedStocks);
            setLoading(false);

        } catch (error) {
            if(_isMounted) {
                toast.handleShow(<ToastErrorTitle />, error.message);
            }
        }
    }

    const setAccountInfo = async (stocks) => {
        try {
            const response = await getAccountBalance();
            if(isNaN(response.account_balance)) throw new Error("Total Balance not found");

            let totalHoldings = 0;
            stocks.forEach(stock => {
                totalHoldings += stock.holdingValue;
            });

            let totalAssets = +response.account_balance + totalHoldings;
                
            setTotalHoldingValue(formatNumToCurrency(totalHoldings));
            setAccountBalance(formatNumToCurrency(response.account_balance));
            setTotalAssetValue(formatNumToCurrency(totalAssets));
            
        } catch (error) {
            toast.handleShow(<ToastErrorTitle />, error.message);
        }

    }

    const trade = (companySymbol) => {
        history.push({
            pathname: '/trade',
            search: `?q=${companySymbol}`
        });
    }

    return (
        <div>
            <Toast show={toast.show} close={toast.handleClose}>{toast.message}</Toast>
            <PortfolioPage
                accountBalance={accountBalance}
                totalHoldingValue={totalHoldingValue}
                totalAssetValue={totalAssetValue}
                holdings={portfolioHoldings}
                holdingsChart={portfolioHoldingsChart}
                loading={loading}
                trade={trade}
            />
        </div>
    );
};

export default PortfolioPageContainer;