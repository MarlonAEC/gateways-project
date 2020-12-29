import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import {
    Form, Col, Row, Button, InputGroup, Card
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
                <Card>
                    <Card.Header>
                        <h4 className="class-header text-form">Peripherial devices</h4>
                    </Card.Header>
                    <Card.Body>
                        {this.state.errorStatus && (
                            <div className="alert alert-danger">The status is incorrect please check</div>
                        )}
                        <Row>
                            <InputGroup as={Col} md={12} sm={12}>
                                <InputGroup.Prepend className="input-group-text" htmlFor="uid" >
                                    UID
                                </InputGroup.Prepend>
                                <Form.Control type="number" min="0" id="uid" placeholder="The UID of the Peripheral device" onChange={this.handleChange} required={true} />
                            </InputGroup>
                            <InputGroup as={Col} md={12} sm={12}>
                                <InputGroup.Prepend className="input-group-text" htmlFor="vendor" >
                                    Vendor
                                </InputGroup.Prepend>
                                <Form.Control type="text" id="vendor" placeholder="The vendor of the peripheral device" onChange={this.handleChange} required={true} />
                            </InputGroup>
                            <InputGroup as={Col} md={12} sm={12}>
                                <InputGroup.Prepend className="input-group-text" htmlFor="status" >
                                    Status
                                </InputGroup.Prepend>
                                <Form.Control as="select" id="status" defaultValue="status" placeholder="Statis of the periferal device" onChange={this.handleChange} required={true}>
                                    <option>online</option>
                                    <option>offline</option>
                                </Form.Control>
                            </InputGroup>
                        </Row>
                        <Row className="container button-container">
                            <Button className="btn btn-secondary" type="submit">
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Form>
        )
    }
}

export default AddPeripheral;
