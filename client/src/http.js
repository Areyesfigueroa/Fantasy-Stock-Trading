//Fetching from Express Internal API.
const postData = (url = '', data = {}, bearerToken = '') => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken ? `Bearer ${bearerToken}` : ''
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
}

const fetchData = (url = '', bearerToken = '') => {
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken ? `Bearer ${bearerToken}` : ''
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}
// Done
const registerUser = async (
  email,
  firstName,
  lastName,
  password,
  retypePassword,
  termsCheck
) => {
  const response = await postData('/api/auth/register/', {
    email,
    firstName,
    lastName,
    password,
    retypePassword,
    termsCheck
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// Done
const loginUser = async (email, password) => {
  const response = await postData(`/api/auth/login/`, { email, password })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}
// Done
const logoutUser = async () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))

  const response = await fetchData(`/api/auth/logout/`, userSession.sessionId)

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  localStorage.removeItem('userSession')
  window.location.reload()
}

// Done
const searchBySymbol = async (symbol) => {
  const response = await fetch(`/api/stocks/search/${symbol}`)

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// Done
const getStockHistory = async (symbol) => {
  const response = await fetch(`/api/stocks/search/${symbol}/history`)

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

//done
const buyCompanyShares = async (symbol, shareUnits, unitPrice) => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))
  const response = await postData(
    `/api/stocks/transaction/buy`,
    { symbol, shareUnits, unitPrice },
    userSession.sessionId
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// done
const sellCompanyShares = async (symbol, shareUnits, unitPrice) => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))
  const response = await postData(
    `/api/stocks/transaction/sell`,
    { symbol, shareUnits, unitPrice },
    userSession.sessionId
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// Done
const getSavedStocks = async () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))
  const response = await fetchData(`/api/stocks/all`, userSession.sessionId)

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// done
const getSavedShareUnits = async (symbol) => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))
  const response = await fetchData(
    `/api/stocks/${symbol}`,
    userSession.sessionId
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }

  return await response.json()
}

// Done
const getAccountBalance = async () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'))
  const response = await fetchData(
    `/api/portfolio/balance`,
    userSession.sessionId
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.errorMessage)
  }
  return await response.json()
}

export {
  registerUser,
  loginUser,
  logoutUser,
  searchBySymbol,
  getStockHistory,
  buyCompanyShares,
  sellCompanyShares,
  getSavedStocks,
  getSavedShareUnits,
  getAccountBalance
}
