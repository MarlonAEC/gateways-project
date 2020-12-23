import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Create from '../../components/gateways/Create';

import {
    Container
} from 'react-bootstrap';

export default class CreatePage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <Container>
                <header className = "class-header">
                    <h1>Lets create a new Gateway!</h1>
                </header>
                <Create />
            </Container>
        )
    }
}
