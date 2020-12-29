import React, { Component } from 'react';
import {
    Container,
} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <header className='class-header'>
                    <h1><span>Gateway management system inspired by <a href="http://musala.com/">MusalaSoft</a></span></h1>
                </header>
                <Container>
                    <h2>
                        Description
                    </h2>
                    <p>This a simple frontend for interact with gateways API!</p>
                    <h2>
                        Contact
                    </h2>
                    <p>Developed by Marlon A. Espinosa Castañeiras: <span><a href="mailto:marlonespinosa83@gmail.com">marlonespinosa83@gmail.com</a></span></p>
                    <p><a href="https://github.com/MarlonAEC">Github</a></p>
                </Container>
            </div>
        )
    }
}
