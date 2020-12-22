process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const Gateway = require('../models/gateway');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');

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
    }); 
});

//const createGateways
