import React from 'react'
import './App.css'

import { Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import SplashPageContainer from './containers/Layout/SplashPageContainer'
import LoginPage from './components/Layout/LoginPage/LoginPage'
import TradePageContainer from './containers/Layout/TradePageContainer'
import PortfolioPageContainer from './containers/Layout/PortfolioPageContainer'

import { useSelector } from 'react-redux'

function App() {
  const { userSession } = useSelector((store) => store)

  const tradePageContainerComp = !!userSession ? TradePageContainer : LoginPage
  const portfolioPageContainerComp = !!userSession
    ? PortfolioPageContainer
    : LoginPage

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/trade' component={tradePageContainerComp} />
        <Route path='/portfolio' component={portfolioPageContainerComp} />
        <Route path='/' component={SplashPageContainer} />
      </Switch>
    </div>
  )
}

export default App
