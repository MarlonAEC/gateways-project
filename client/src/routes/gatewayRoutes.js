import React from 'react';
import { Route } from 'react-router-dom';
//import {List} from '../components/gateways';
import GatewaysListPage from '../views/gateways/GatewaysListPage';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    <Route path="/gateways" component={GatewaysListPage} exact key="list"/>
];