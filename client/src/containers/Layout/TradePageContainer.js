import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import TradePage from '../../components/Layout/TradePage/TradePage';
import Toast from '../../components/Toast/Toast';
import useToast from '../../hooks/useToast';

import { searchBySymbol, getStockHistory, buyCompanyShares, sellCompanyShares, logoutUser, getSavedShareUnits } from '../../http';

const TradePageContainer = () => {

    const userSession = useContext(UserSessionContext());
    const history = useHistory();
    const toast = useToast();

    const [savedStocks, setSavedStocks]=useState([]); //load stocks from database. 
    const [searchResult, setSearchResult]=useState(null); 
    const [stockHistory, setStockHistory]=useState(null);
    const [loadingStocks, setLoadingStocks]=useState(true);
    const [loadingSearchRes, setLoadingSearchRes]=useState(false);
    
    useEffect(() => {
        if(!userSession.session) history.push('/login');
        setInitialStocks();

        if(!history.location.search) return;

        const params = new URLSearchParams(history.location.search);
        handleSearch(params.get('q'));
    }, []);

    const setInitialStocks = async () => {
        try {            
            const initialStocks = ['SPY', 'DIA', 'IWM'];
            let stocks = [];
            for(let i = 0; i < initialStocks.length; i++) {
                stocks = savedStocks;
                stocks.push(await searchBySymbol(initialStocks[i]));
                
                const { sharesHeld } = await getSavedShareUnits(stocks.id);
                stocks[i].sharesHeld = sharesHeld;

                setSavedStocks(stocks);
            }
            setLoadingStocks(false);
        } catch (error) {
            toast.handleShow(error.message);
        }
    }

    const setSearchRes = async (searchTerm) => {
        try {
            const res = await searchBySymbol(searchTerm);
            const { sharesHeld } = await getSavedShareUnits(searchTerm);
            res.sharesHeld = sharesHeld;

            setSearchResult(res);
        } catch (error) {
            setSearchResult(null);
            throw error;
        }
    }

    const setStockHistoryRes = async(searchTerm) => {
        try {
            const res = await getStockHistory(searchTerm);

            let chartData = res.map(el => [el.time, el.price]);
            chartData.unshift(['Time', searchTerm.toUpperCase()]);

            setStockHistory({ date: res[0].date, chartData });
        } catch (error) {
            setStockHistory(null);
            throw error;
        }
    }

    const handleSearch = async (searchTerm) => {
        try {
            setLoadingSearchRes(true);
            await setSearchRes(searchTerm);
            await setStockHistoryRes(searchTerm);
            setLoadingSearchRes(false);
        } catch (error) {
            toast.handleShow(error.message);
        }
    }

    const addShareUnits = (sharesHeld, shareUnits) => {
        return sharesHeld + shareUnits;
    }

    const reduceShareUnits = (sharesHeld, shareUnits) => {
        return sharesHeld - shareUnits;
    }

    const updateSharesHeld = (symbol, shareUnits, callback) => {
        if(searchResult && searchResult.id === symbol){
            const searchResultCopy = { ...searchResult };
            searchResultCopy.sharesHeld = callback(parseInt(searchResultCopy.sharesHeld), parseInt(shareUnits));

            setSearchResult(searchResultCopy);
        } else {

            const newSavedStocks = savedStocks.map(stock => {
                if(stock.id === symbol){
                    const stockCopy = { ...stock };
                    stockCopy.sharesHeld = callback(parseInt(stockCopy.sharesHeld), parseInt(shareUnits));

                    return stockCopy;
                }

                return stock;
            });

            setSavedStocks(newSavedStocks);
        }

    }

    //TODO: Update new sharesHeld
    const buyShares = async (symbol, shareUnits, unitPrice) => {
        try {
            const response = await buyCompanyShares(symbol, shareUnits, unitPrice);
            if(response.hasExpired) await logoutUser();

            updateSharesHeld(symbol, shareUnits, addShareUnits);
        } catch (error) {
            toast.handleShow(error.message);
        }
    }

    const sellShares = async (symbol, shareUnits, unitPrice) => {
        try {
            const response = await sellCompanyShares(symbol, shareUnits, unitPrice)
            if(response.hasExpired) await logoutUser();

            updateSharesHeld(symbol, shareUnits, reduceShareUnits);
        } catch (error) {
            toast.handleShow(error.message);
        }
    }

    return (
        <div>
            <Toast show={toast.show} close={toast.handleClose}>{toast.message}</Toast>
            <TradePage
                search={handleSearch}
                searchResult={searchResult}
                stocks={savedStocks}
                stockHistoryChart={stockHistory}
                loadingStocks={loadingStocks}
                loadingSearchRes={loadingSearchRes}
                buy={buyShares}
                sell={sellShares}
            />
        </div>
    );
};

export default TradePageContainer;