import React, { Component } from 'react'
import AddPeripheral from './AddPeripheral';
import { create, reset } from '../../actions/gateways/create';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    Col,
    Form,
    Container,
    Button
} from 'react-bootstrap';
import GatewayPeripheralDevice from './GatewayPeripheralDevices';
import PropTypes from 'prop-types';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Create extends Component {
    static propTypes = {
        created: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        create: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
      }
    state = {
        peripherals: [
        ],
        errorUnique: false,
        errorSize: false,
        errorStatus: false,
        errorIp: false,
        ipAddress: null,
        name: null,
        serialNumber: null,
        ipRegex: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    }

    deletePeripheral = (id) =>{
        const peripherals = this.state.peripherals.filter(peripheral =>{
            return peripheral.uid !== id;
        })
        this.setState({
            peripherals
        });
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleIpChange = (e) =>{
        if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e.target.value)){
            this.setState({
                [e.target.id]: e.target.value,
                errorIp: false
            })
        }else{
            this.setState({
                errorIp: true
            })
        }
    }

    addPeripheral = (peripheral) => {
        let i = this.state.peripherals.find((item)=>{
            return item.uid == peripheral.uid
        });
        if(this.state.peripherals.length >= 10){
            let errorSize = true;
            this.setState({
                errorSize
            })
        }else if(i){
            let errorUnique = true;
            this.setState({
                errorUnique
            })
        }
        else{
            let peripherals = [...this.state.peripherals, peripheral];
            this.setState({peripherals}); 
            this.setState({
                errorUnique: false,
                errorSize: false
            })
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.errorIp 
            && !this.state.errorSize 
            && !this.state.errorStatus
            && !this.state.errorUnique){
                let newGateway = {
                    name: this.state.name,
                    ipAddress: this.state.ipAddress,
                    serialNumber: this.state.serialNumber,
                    perDevices: [...this.state.peripherals],
                }
                this.props.create(newGateway);
        }
    }

    render() {
        return (
            <Container>
                {this.state.created && (
                    <Redirect to={`show/${encodeURIComponent(this.state.retrieved['_id'])}`}/>
                )}
                {this.props.error && (
                    <div className="alert alert-danger">
                        <span>Error: {this.props.error.error}<br/></span>
                        <span>Description: {this.props.error.description}<br/></span>
                    </div>
                )}
                {this.state.errorUnique && (
                    <div className="alert alert-danger">The UID must be unique</div>
                )}
                {this.state.errorSize && (
                    <div className="alert alert-danger">Only 10 peripheral devices allowed per gateway</div>
                )}
                {this.state.errorStatus && (
                    <div className="alert alert-danger">The field status should be</div>
                )}
                <div className="peripheral-container">
                    <AddPeripheral addPeripheral={this.addPeripheral}/>
                    <div className="container" md={6}>
                        <label className="input-group-text" htmlFor="name" >
                            Peripheral Devices
                        </label>
                        <GatewayPeripheralDevice peripherals={this.state.peripherals} deletePeripheral={this.deletePeripheral}/>
                    </div>
                </div>
                <Form className="gateway-form" onSubmit={this.handleSubmit}>
                    <Form.Group as={Col} md={4}>
                        <label className="input-group-text" htmlFor="serialNumber" >
                            Serial Number
                        </label>
                        <Form.Control type="text" id="serialNumber" onChange={this.handleChange} placeholder="Serial Number" /*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        <label className="input-group-text" htmlFor="name" >
                            Name
                        </label>
                        <Form.Control type="text" id="name" placeholder="Human readable name" onChange={this.handleChange}/*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        {this.state.errorIp && 
                            <div className="alert alert-danger">Incorrect IP value</div>
                        }
                        <label className="input-group-text" htmlFor="name" >
                            Ipv4 Address
                        </label>
                        <Form.Control type="text" id="ipAddress" onChange={this.handleIpChange} className={this.state.errorIp ? "input-error" : ""} placeholder="IP Address of the gateway" /*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Button className="button-add" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}


const mapStateToProps = (state) =>{
    const{
        created,
        error,
        loading
    } = state.gateways.create

    return {created, error, loading};
}

const mapDispatchToProps = (dispatch) =>({
    create: item => dispatch(create(item)),
    reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);