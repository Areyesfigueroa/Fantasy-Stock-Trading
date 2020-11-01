import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { fetchFakeData2, searchBySymbol } from '../../http';

const TradePageContainer = () => {

    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    const [savedStocks, setSavedStocks]=useState(null); //load stocks from database. 
    const [searchResult, setSearchResult]=useState(null); 
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


    const handleSearch = (search) => {
        searchBySymbol(search)
        .then((res) => {
            console.log(res);
            setSearchResult(res);
        })
        .catch(err => console.log(err.errorMessage));
    }

    return (
        <TradePage
            search={handleSearch}
            searchResult={searchResult}
            stocks={savedStocks}
            loadingStocks={loadingStocks}
            loadingSearchRes={loadingSearchRes}
        />
    );
};

export default TradePageContainer;