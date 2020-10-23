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
const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

const registerUser = async (email, firstName, lastName, password, termsCheck) => {
    const response = await postData('/api/auth/register/', {email, firstName, lastName, password, termsCheck})
    if(!response.status.ok) {
        throw new Error(await response.json());
    }

    return response
    .then(res => {
        return res.json(res);
    })
    .catch(error => console.log("API Error, Register: " + error.message)); //use toast to showcase error. 
};

const loginUser = async (email, password) => {
    const response = await postData(`/api/auth/login/`, { email, password });

    if(!response.ok) {
        throw new Error(await response.json());
    }

    return response
    .then(res => res.json(res))
    .catch(error => console.log("API Error, Login"));
}

export { fetchFakeData, fetchFakeData2, registerUser, loginUser }