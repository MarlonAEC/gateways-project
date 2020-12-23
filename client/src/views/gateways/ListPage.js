import React, { Component } from 'react';
import List from '../../components/gateways/List';

export default class GatewaysListPage extends Component {

    render() {
        return (
            <div className="container page">
                <header className="class-header">
                    <h1 className="mx-4"><span>List of all Gateways</span></h1>
                </header>
                <div>
                    <List />
                </div>
            </div>
        )
    }
}
