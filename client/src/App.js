import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

//import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFoundPage from './components/errors/NotFoundPage';

import history from './history';

import { ConnectedRouter } from 'connected-react-router';

const App = ()=> {
  return (
    <ConnectedRouter history={history}>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} strict={true} exact={true} key="home"/>
            {/**here import routes */}
          <Route component={NotFoundPage} key="notfound" />
        </Switch>
    </ConnectedRouter>
  );
}

export default App;
