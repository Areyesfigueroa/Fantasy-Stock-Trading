import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import SplashPageContainer from './containers/Layout/SplashPageContainer';
import LoginPage from './components/Layout/LoginPage/LoginPage';
import TradePageContainer from './containers/Layout/TradePageContainer';

// TESTING
function App() {
  return (
    <div className="App">
      <Header />
      {/* <SplashPageContainer /> */}
      {/* <LoginPage /> */}
      <TradePageContainer />
    </div>
  );
}

export default App;
