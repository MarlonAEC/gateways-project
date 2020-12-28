import React, { Component } from 'react';
import {
    Container,
} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <header className='class-header'>
                    <h1><span>Gateway management system inspired by <a href="/#">MusalaSoft</a></span></h1>
                </header>
                <Container>
                    <h2>
                        Description
                    </h2>
                    <p>This a simple frontend for interact with gateways API!</p>
                </Container>
            </div>
        )
    }
}
