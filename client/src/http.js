const dummyData = {
    companyName: "SPDR S&P 500 ETF Trust",
    companySubtitle: "SPY",
    currentPrice: 133,
    percentChange: .949,
    dailyGainLoss: -3.2
}

const dummyDataArr = [
    {
        id: 0,
        companyName: "SPDR S&P 500 ETF Trust",
        companySubtitle: "SPY",
        currentPrice: 133,
        percentChange: .949,
        dailyGainLoss: -3.2
    },
    {
        id: 1,
        companyName: "SPDR Dow Jones Industrial Average ETF Trust",
        companySubtitle: "DIA",
        currentPrice: 281.51,
        percentChange: 1.702,
        dailyGainLoss: 4.71
    },
    {
        id: 2,
        companyName: "iShares Russell 2000 ETF",
        companySubtitle: "IWM",
        currentPrice: 157.07,
        percentChange: 2.761,
        dailyGainLoss: 4.22
    }
]

const fetchFakeData = async (count) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let arr = [];
            for (let i = 0; i < count; i++) {
                arr.push({id: i, ...dummyData});
            }
            resolve(arr);
        }, 1000);
    });
}

const fetchFakeData2 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyDataArr);
        }, 1000);
    });
}

//Fetching from Express Internal API.
const postData = (url='', data={}, bearerToken='') => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken ? `Bearer ${bearerToken}`:''
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
}

const fetchData = (url='', bearerToken='') => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken ? `Bearer ${bearerToken}`:''
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
}

const registerUser = async (email, firstName, lastName, password, termsCheck) => {
    const response = await postData('/api/auth/register/', {email, firstName, lastName, password, termsCheck});

    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
};

const loginUser = async (email, password) => {
    const response = await postData(`/api/auth/login/`, { email, password });
    
    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
}

const logoutUser = async(sessionId) => {
    const response = await fetchData(`api/auth/logout/`, sessionId);

    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
}

const searchBySymbol = async (symbol) => {
    const response = await fetch(`/api/stocks/search/${symbol}`);

    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
}

const getStockHistory = async (symbol) => {
    const response = await fetch(`/api/stocks/search/${symbol}/history`);

    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
}

const buyCompanyShares = async (sessionId, symbol, shareUnits) => {
    const response = await postData(`/api/stocks/transaction/buy`, {symbol, shareUnits}, sessionId);

    if(!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage);
    }

    return await response.json();
}



export { 
    fetchFakeData, 
    fetchFakeData2, 
    registerUser, 
    loginUser, 
    logoutUser,
    searchBySymbol, 
    getStockHistory,
    buyCompanyShares
 }