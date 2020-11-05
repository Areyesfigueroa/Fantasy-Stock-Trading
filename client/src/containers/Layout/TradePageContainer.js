import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { searchBySymbol, getStockHistory, buyCompanyShares, logoutUser } from '../../http';

const TradePageContainer = () => {

    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    const [savedStocks, setSavedStocks]=useState([]); //load stocks from database. 
    const [searchResult, setSearchResult]=useState(null); 
    const [stockHistory, setStockHistory]=useState(null);
    const [loadingStocks, setLoadingStocks]=useState(true);
    const [loadingSearchRes, setLoadingSearchRes]=useState(false);
    
    useEffect(() => {
        if(!userSession.session) history.push('/login');
        setInitialStocks();
    }, []);

    const setInitialStocks = async () => {
        try {            
            const initialStocks = ['SPY', 'DIA', 'IWM'];
            let stocks = [];
            for(let i = 0; i < initialStocks.length; i++) {
                stocks = savedStocks;
                stocks.push(await searchBySymbol(initialStocks[i]));
                setSavedStocks(stocks);
            }
    
            setLoadingStocks(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSearch = (searchTerm) => {
        setLoadingSearchRes(true);
        searchBySymbol(searchTerm)
        .then((res) => {
            console.log(res);
            setLoadingSearchRes(false);
            setSearchResult(res);
        })
        .catch(err => {
            console.log(err);
            setSearchResult(null);
        });

        getStockHistory(searchTerm)
        .then(res => {
            let chartData = res.map(el => [el.time, el.price]);
            chartData.unshift(['Time', searchTerm.toUpperCase()]);

            setStockHistory({ date: res[0].date, chartData });
        })
        .catch(err => {
            console.log(err);
            setStockHistory(null);
        });
    }

    const buyShares = async (symbol, shareUnits) => {
        try {
            const response = await buyCompanyShares(symbol, shareUnits);
            if(response.hasExpired) await logoutUser();

            console.log(response) //use toast
            
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <TradePage
            search={handleSearch}
            searchResult={searchResult}
            stocks={savedStocks}
            stockHistoryChart={stockHistory}
            loadingStocks={loadingStocks}
            loadingSearchRes={loadingSearchRes}
            buy={buyShares}
        />
    );
};

export default TradePageContainer;