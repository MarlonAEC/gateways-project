import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {create, reset} from '../../actions/peripheral/create'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Container,
    Form,
    Col,
    Button
} from 'react-bootstrap';

import PeripheralList from './PeripheralList';

class Create extends Component {
    static propTypes = {
        created: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        create: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
      }

    state = {
        peripherals: [],
        gatewayId: null,
        uid: "",
        vendor: "",
        status: "",
        errorSize: false,
        errorUnique: false,
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.create({
            uid: this.state.uid,
            vendor: this.state.vendor,
            status: this.state.status,
            gatewayId: this.state.gatewayId
        })
    }

    // addPeripheral = (peripheral) => {
    //     let i = this.state.peripherals.find((item)=>{
    //         return item.uid === peripheral.uid
    //     });
    //     if(this.state.peripherals.length >= 10){
    //         let errorSize = true;
    //         this.setState({
    //             errorSize
    //         })
    //     }else if(i){
    //         let errorUnique = true;
    //         this.setState({
    //             errorUnique
    //         })
    //     }
    //     else{
    //         let peripherals = [...this.state.peripherals, peripheral];
    //         this.setState({peripherals}); 
    //         this.setState({
    //             errorUnique: false,
    //             errorSize: false
    //         })
    //     }
    // }

    // deletePeripheral = (id) =>{
    //     const peripherals = this.state.peripherals.filter(peripheral =>{
    //         return peripheral.uid !== id;
    //     })
    //     this.setState({
    //         peripherals
    //     });
    // }

    render() {
        return (
            <Container>
                {this.props.created && (
                    <Redirect to={`show/${encodeURIComponent(this.props.created['_id'])}`}/>
                )}
                {this.props.errorUnique && (
                    <div className="alert alert-danger">The UID must be unique</div>
                )}
                {this.props.errorSize && (
                    <div className="alert alert-danger">Only 10 peripheral devices allowed per gateway</div>
                )}
                {this.props.errorStatus && (
                    <div className="alert alert-danger">The field status should be</div>
                )}
                <Form className="gateway-form" onSubmit={this.handleSubmit}>
                    <Form.Group as={Col} md={3}>
                        <label className="input-group-text" htmlFor="uid" >
                            UID
                        </label>
                        <Form.Control type="number" min="0" id="uid" onChange={this.handleChange} placeholder="UID of the peripheral device" /*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={3}>
                        <label className="input-group-text" htmlFor="vendor" >
                            Vendor
                        </label>
                        <Form.Control type="text" id="vendor" placeholder="Peripheral vendor" onChange={this.handleChange}/*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={3}>
                        <label className="input-group-text" htmlFor="status" >
                            Status
                        </label>
                        <Form.Control as="select" id="status" onChange={this.handleChange} className={this.state.errorIp ? "input-error" : ""} placeholder="IP Address of the gateway" /*value={} onChange={(e) => setName(e.target.value)}*/ required={true} >
                            <option>online</option>
                            <option>offline</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md={3}>
                        <label className="input-group-text" htmlFor="gatewayId" >
                            Gateway ID
                        </label>
                        <Form.Control type="text" id="gatewayId" onChange={this.handleChange} placeholder="ID of the owner" /*value={} onChange={(e) => setName(e.target.value)}*/ required={true} />
                    </Form.Group>
                    <Button className="button-add" type="submit">
                        Submit
                    </Button>
                </Form>
                {/* <PeripheralList peripherals={this.state.peripherals} deletePeripheral={this.deletePeripheral}/>
                <Button className="button-add" onSubmit={this.handlePersist}>
                    Submit
                </Button> */}
            </Container>
        )
    }
}

const mapStateToProps = (state)=>{
    const{
        errorUnique,
        errorSize
    } = state;
    const{
        error,
        created,
        loading,

    } = state.peripherals.create;

    return {error, created, loading, errorUnique, errorSize};
}

const mapDispatchToProps =(dispatch)=>({
    create: values => dispatch(create(values)),
    reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);