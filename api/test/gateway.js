process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const Gateway = require('../models/gateway');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');
const { NULL } = require('node-sass');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Gateways', () => {
    beforeEach((done) => {
        Gateway.remove({}, (err) => {
            done();
        });
    });

    /**
     * Testing the /GET route
     */
    describe('/GET Gateway', () => {
        it('it should GET an array of gateways an it should be blank!', (done) => {
            chai.request(app)
                .get('/api/gateways')
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    done()
                });
        });
        it('it should GET an array of gateways an it should contain only one item',(done) => {
            let gateway = new Gateway({
                uid: 1,
                name: "testName",
                serialNumber: "136",
                ipAddress: "10.10.1.1",
                perDevices: []
            });
            gateway.save((err, gateway) =>{
                chai.request(app)
                    .get('/api/gateways')
                    .end((err, res) =>{
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                        done();
                    });
            });
        });
    }); 

    /**
     * Testing /POST for route /api/gateways
     */
    describe('/POST Gateways', () =>{
        it('it should create a new Gateway with no peripheral devices', (done) => {
            let gateway = {
                name: "testName",
                serialNumber: "136",
                ipAddress: "10.10.1.1",
                perDevices: []
            }
            chai.request(app)
                .post('/api/gateways')
                .send(gateway)
                .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Gateway successfully added!');
                        res.body.should.have.property('gateway');
                        res.body.gateway.should.have.property('name').eql("testName");
                        res.body.gateway.should.have.property('serialNumber').eql("136");
                        res.body.gateway.should.have.property('ipAddress').eql("10.10.1.1");
                        res.body.gateway.should.have.property('perDevices').eql([]);
                    done();
                })
        });
        it('it should NOT create a new Gateway because name field is not send in request', (done) => {
            let gateway = {
                serialNumber: "136",
                ipAddress: "10.10.1.1",
                perDevices: []
            }
            chai.request(app)
                .post('/api/gateways')
                .send(gateway)
                .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.length.should.be.eql(1);
                        expect(res.body.errors).to.be.an('array').that.deep.include({msg: 'This value should not be blank', param: "name", location: "body"});
                    done();
                })
        });
        it('it should NOT create the gateway because status value is NOT in the enumerated values allowed', (done) => {
            let gateway = {
                serialNumber: "136",
                name: "testName",
                ipAddress: "10.10.1.1",
                perDevices: [{
                    uid: 1,
                    vendor: "Some vendor",
                    status: "algo"
                }]
            }
            chai.request(app)
                .post('/api/gateways')
                .send(gateway)
                .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').eql('ValidationError');
                        //res.body.should.have.property('description').eql("PDevices validation failed: status: `algo` is not a valid enum value for path `status`.");  
                    done();
                })
        });
        it('it should NOT create the gateway because of the invalid IP provided', (done) => {
            let gateway = {
                serialNumber: "136",
                name: "testName",
                ipAddress: "10.10.1.a",
                perDevices: [{
                    uid: 1,
                    vendor: "Some vendor",
                    status: "online"
                }]
            }
            chai.request(app)
                .post('/api/gateways')
                .send(gateway)
                .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.length.should.be.eql(1);
                        expect(res.body.errors).to.be.an('array').that.deep.include(
                            {
                                value: "10.10.1.a",
                                msg: "Please enter a valid IP Address", 
                                param: "ipAddress", 
                                location: "body"
                            });
                    done();
                })
        });
        it('it should NOT create the gateway because exceeded the limit of 10 peripheral devices per gateway', (done) => {
            let gateway = {
                serialNumber: "136",
                name: "testName",
                ipAddress: "10.10.1.1",
                perDevices: [
                    {uid: 1,vendor: "Some vendor",status: "online"},
                    {uid: 2,vendor: "Some vendor",status: "online"},
                    {uid: 3,vendor: "Some vendor",status: "online"},
                    {uid: 4,vendor: "Some vendor",status: "online"},
                    {uid: 5,vendor: "Some vendor",status: "online"},
                    {uid: 6,vendor: "Some vendor",status: "online"},
                    {uid: 7,vendor: "Some vendor",status: "online"},
                    {uid: 8,vendor: "Some vendor",status: "online"},
                    {uid: 9,vendor: "Some vendor",status: "online"},
                    {uid: 10,vendor: "Some vendor",status: "online"},
                    {uid: 11,vendor: "Some vendor",status: "online"},
                ]
            }
            chai.request(app)
                .post('/api/gateways')
                .send(gateway)
                .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql("ValidationError");
                        res.body.should.have.property('description').eql("Only 10 peripheral devices per gateway are allowed!");
                    done();
                })
        });
    });
    /**
     * Testing DELETE
     */
    describe('/DELETE Gateway', () => {
        it('it should DELETE a gateway normally!', (done) => {
            let gateway = new Gateway({
                uid: 1,
                name: "testName",
                serialNumber: "136",
                ipAddress: "10.10.1.1",
                perDevices: []
            });
            console.log("AQUI", gateway._id);
            gateway.save((err)=>{                
                chai.request(app)
                    .delete('/api/gateways/'+ gateway._id)
                    .end((err, res) => {
                        expect(err).to.be.null;
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.property('serialNumber').eql(gateway.serialNumber);
                        done()
                    });
            });
        });
    });
});

