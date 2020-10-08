import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import SplashPageContainer from './containers/Layout/SplashPageContainer';
import LoginPage from './components/Layout/LoginPage/LoginPage';
import TradePageContainer from './containers/Layout/TradePageContainer';
import PortfolioPage from './components/Layout/PortfolioPage/PorfolioPage';
import Charts from './components/Charts/Charts';

// TESTING
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/trade' component={TradePageContainer} />
        <Route path='/portfolio' component={PortfolioPage} />

        {/* TESTING */}
        <Route path='/' component={Charts} />
        <Route path='/' component={SplashPageContainer} />
      </Switch>
    </div>
  );
}

export default App;
