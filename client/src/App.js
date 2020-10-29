import React from 'react';
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/Header/Header';
import SplashPageContainer from './containers/Layout/SplashPageContainer';
import LoginPage from './components/Layout/LoginPage/LoginPage';
import TradePageContainer from './containers/Layout/TradePageContainer';
import PortfolioPage from './components/Layout/PortfolioPage/PorfolioPage';
import Charts from './components/Charts/Charts';

import useLocalStorage from './hooks/useLocalStorage';

// TESTING
function App() {

  const [userSession, setUserSession] = useLocalStorage('userSession', null);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/login'>
          <LoginPage setUserSession={setUserSession} />
        </Route>
        <Route path='/trade' >
          {userSession ? <TradePageContainer />:<Redirect to='/login' />}
        </Route>
        <Route path='/portfolio'>
          {userSession ? <PortfolioPage />:<Redirect to='/login' />}
        </Route>

        {/* TESTING */}
        <Route path='/charts' >
          {userSession ? <Charts />:<Redirect to='/login' />}
        </Route> 
        <Route path='/' >
          <SplashPageContainer setUserSession={setUserSession} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
