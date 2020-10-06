import React, { useState, useEffect } from 'react';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { fetchFakeData, fetchFakeData2 } from '../../http';

const TradePageContainer = () => {
    const [data, setData]=useState(null);
    const [loading, setLoading]=useState(true);
    
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

    return (
        <TradePage data={data} loading={loading} search={handleSearch}/>
    );
};

export default TradePageContainer;