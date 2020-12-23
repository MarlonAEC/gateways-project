import React, { Component } from 'react';

import {
    Form, Col, Row, Button
} from 'react-bootstrap'



class AddPeripheral extends Component{
    state = {
        uid: -1,
        vendor: "",
        status: "online",
        errorStatus: false
    }


    handleChange = (e) =>{
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.addPeripheral({
            uid: this.state.uid,
            vendor: this.state.vendor,
            status: this.state.status
        });
    }

    render(){
        return (
            <Form className="peripherals-form" onSubmit={this.handleSubmit}>
                <h3 className="class-header text-form">Add a peripherial device</h3>
                {this.state.errorStatus && (
                    <div className="alert alert-danger">The status is incorrect please check</div>
                )}
                <Row>
                    <Form.Group as={Col} md={4}>
                        <label className="input-group-text" htmlFor="uid" >
                            UID
                        </label>
                        <Form.Control type="number" min="0" id="uid" placeholder="The UID of the Peripheral device" onChange={this.handleChange} required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        <label className="input-group-text" htmlFor="vendor" >
                            Vendor
                        </label>
                        <Form.Control type="text" id="vendor" placeholder="The vendor of the peripheral device" onChange={this.handleChange} required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        <label className="input-group-text" htmlFor="status" >
                            Status
                        </label>
                        <Form.Control as="select" id="status" defaultValue="status" placeholder="Statis of the periferal device" onChange={this.handleChange} required={true}>
                            <option>online</option>
                            <option>offline</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row className="container button-container">
                    <Button className="button-add" type="submit">
                        Add
                    </Button>
                </Row>
            </Form>
        )
    }
}

export default AddPeripheral;
