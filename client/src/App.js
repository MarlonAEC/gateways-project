import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './history';

//import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFoundPage from './components/errors/NotFoundPage';
//import routes
import gatewayRoutes from './routes/gatewayRoutes';
import peripheralRoutes from './routes/peripheralRoutes';
const App = ()=> {
  return (
    <BrowserRouter history={history}>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact key="home"/>
            {/**here import routes */}
            {gatewayRoutes}
            {peripheralRoutes}
          <Route component={NotFoundPage} key="notfound" />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
