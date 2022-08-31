import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Staking from './pages/staking';
import { loadWeb3 } from './interactWithSmartContract';

import { createGlobalStyle } from 'styled-components';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

loadWeb3();

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const app= () => (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
      <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        {/* <ItemDetailRedux path="/ItemDetail/:nftId" /> */}
        <Staking path="/staking" />
        </ScrollTop>
      </PosedRouter>
    <ScrollToTopBtn />
    <NotificationContainer/>
  </div>
);

export default app;
