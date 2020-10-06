import React, { useState, useEffect } from 'react';
import TradePage from '../../components/Layout/TradePage/TradePage';

import { fetchFakeData } from '../../http';

const TradePageContainer = () => {
    const [data, setData]=useState(null);
    const [loading, setLoading]=useState(true);
    
    useEffect(() => {
        fetchFakeData(5)
        .then((res) => {
            setData(res);
            setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, []);

    return (
        <TradePage data={data} loading={loading} />
    );
};

export default TradePageContainer;