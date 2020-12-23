import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
    render() {
        return (
            <nav className="class-navbar-links class-navbar">
                <Link to="/">Home</Link>
                <Link to="/gateways/list">Gateways</Link>
                <Link to="/peripheral-devices/list">Peripheral Devices</Link>
            </nav>
        )
    }
}
