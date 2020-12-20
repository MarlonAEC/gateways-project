const fakingoose = require('fakingoose');
const GatewaySchema = require('../models/gateway');
const gatewayFactory = fakingoose(GatewaySchema, {
    _id:{
        tostring: false
    },
    name:{
        tostring: true
    }
})