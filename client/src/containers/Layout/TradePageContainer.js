import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { fetchFakeData2, searchBySymbol, getStockHistory } from '../../http';

const TradePageContainer = () => {

    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    const [savedStocks, setSavedStocks]=useState(null); //load stocks from database. 
    const [searchResult, setSearchResult]=useState(null); 
    const [stockHistory, setStockHistory]=useState(null);
    const [loadingStocks, setLoadingStocks]=useState(true);
    const [loadingSearchRes, setLoadingSearchRes]=useState(false);
    
    useEffect(() => {
        if(!userSession.session) history.push('/login');

        fetchFakeData2()
        .then((res) => {
            setSavedStocks(res);
            setLoadingStocks(false);
        })
        .catch((err) => console.log(err.message));
    }, []);


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

    return (
        <TradePage
            search={handleSearch}
            searchResult={searchResult}
            stocks={savedStocks}
            stockHistoryChart={stockHistory}
            loadingStocks={loadingStocks}
            loadingSearchRes={loadingSearchRes}
        />
    );
};

export default TradePageContainer;