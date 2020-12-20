import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../../components/gateways/List';

export default class GatewaysListPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="gateway-page content-wrap page">
                <div className="header-wrapper">
                    <h1 className="mx-4"><span>Gateways!</span></h1>
                </div>
                <div>
                    <List />
                </div>
            </div>
        )
    }
}
