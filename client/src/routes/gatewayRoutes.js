import React from 'react';
import { Route } from 'react-router-dom';
import ListPage from '../views/gateways/ListPage';
import ShowPage from '../views/gateways/ShowPage';
import CreatePage from '../views/gateways/CreatePage';
import ErasePage from '../views/gateways/ErasePage';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    <Route path="/gateways/list" component={ListPage} key="gateway-list"/>,
    <Route path="/gateways/show/:id" component={ShowPage} key="gateway-show"/>,
    <Route path="/gateways/create" component={CreatePage} key="gateway-create"/>,
    <Route path="/gateways/delete/:id" component={ErasePage} key="gateways-delete"/>
];