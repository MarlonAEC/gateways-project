const fakingoose = require('fakingoose');
const GatewaySchema = require('../models/gateway');
const Peripheral = require('../models/peripheralDevice');

const gatewayFactory = fakingoose(GatewaySchema, {
    _id:{
        type: GatewaySchema.Types.ObjectId
    },
    perDevices:[
        {
            type: Peripheral.Types.ObjectId
        }
    ]
})

module.export = gatewayFactory.generate();