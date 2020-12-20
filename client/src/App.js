import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

//import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFoundPage from './components/errors/NotFoundPage';

//import routes
import gatewayRoutes from './routes/gatewayRoutes';

const App = ()=> {
  return (
    <ConnectedRouter history={history}>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} strict={true} exact={true} key="home"/>
            {/**here import routes */}
            {gatewayRoutes}
          <Route component={NotFoundPage} key="notfound" />
        </Switch>
    </ConnectedRouter>
  );
}

export default App;
