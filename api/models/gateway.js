var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var pdevice = require('./peripheralDevice');
var uniqueValidator = require('mongoose-unique-validator');

function arrayLimit(val){
    return val.length < 10;
}
var GatewaySchema = new Schema({
    serialNumber:{
        type: String,
        required: true,
        unique:true,
        uniqueCaseInsensitive: true
    },
    name:{
        type: String,
        required: true
    },
    ipAddress:{
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
            },
            message: "{VALUE} is not a valid IP address please check the input"
        }
    },
    perDevices: {
        type: [ {type: Schema.Types.ObjectId, ref: 'PDevices'} ],
        validate: [
            arrayLimit, '{PATH} exceeds the limit of 10' 
        ]
    }
});

GatewaySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Gateways', GatewaySchema);