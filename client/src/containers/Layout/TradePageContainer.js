import React, { useState, useEffect } from 'react';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { fetchFakeData, fetchFakeData2 } from '../../http';

const TradePageContainer = () => {
    const [data, setData]=useState(null);
    const [loading, setLoading]=useState(true);
    const [showBuyModal, setShowBuyModal]=useState(false);
    const [showSellModal, setShowSellModal]=useState(false);
    
    useEffect(() => {
        fetchFakeData2()
        .then((res) => {
            setData(res);
            setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, []);


    const handleSearch = (search) => {
        //TODO: Query Search Values, using fetch internal API.
        console.log(search);
    }

    // const handleShowBuyModal = () => setShowBuyModal(true);
    // const handleCloseBuyModal = () => setShowBuyModal(false);

    // const handleShowSellModal = () => setShowSellModal(true);
    // const handleCloseSellModal = () => setCloseSellModal(false);

    return (
        <TradePage 
            data={data} 
            loading={loading} 
            search={handleSearch} 

            // showBuyModal={showBuyModal}
            // handleShowBuyModal={handleShowBuyModal}
            // handleCloseBuyModal={handleCloseBuyModal}

            // showSellModal={showSellModal}
            // handleShowSellModal={handleShowSellModal}
            // handleCloseSellModal={handleCloseSellModal}

             />
    );
};

export default TradePageContainer;