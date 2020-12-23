import React, { Component } from 'react';
import List from '../../components/peripheral/List';

export default class GatewaysListPage extends Component {

    render() {
        return (
            <div className="container page">
                <header className="class-header">
                    <h1 className="mx-4"><span>List of all Peripheral Devices</span></h1>
                </header>
                <div>
                    <List />
                </div>
            </div>
        )
    }
}
