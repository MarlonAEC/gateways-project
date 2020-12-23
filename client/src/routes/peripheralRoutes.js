import React from 'react';
import { Route } from 'react-router-dom';
import ListPage from '../views/peripheral/PeripheralListPage';
import ShowPage from '../views/peripheral/PeripheralShowPage';
import CreatePage from '../views/peripheral/PeripheralCreatePage';
import Erase from '../components/peripheral/Erase';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    <Route path="/peripheral-devices/list" component={ListPage} key="peripheral-list"/>,
    <Route path="/peripheral-devices/show/:id" component={ShowPage} key="peripheral-show"/>,
    <Route path="/peripheral-devices/create" component={CreatePage} key="peripheral-create"/>,
    <Route path="/peripheral-devices/delete/:id" component={Erase} key="peripheral-delete"/>
];