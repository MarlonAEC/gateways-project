import React, { Component } from 'react'
import Show from '../../components/peripheral/Show';

export default class ShowPage extends Component {
    render() {
        return (
            <div>
                <Show match = {this.props.match}/>
            </div>
        )
    }
}

