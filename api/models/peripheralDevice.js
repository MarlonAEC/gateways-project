var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const gateway = require('./gateway');
var Schema = mongoose.Schema;

var PDeviceSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    vendor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        require: true,
        enum: ['online', 'offline']
    },
    gatewayId:{ type: Schema.Types.ObjectId, ref: 'Gateways'}
}) 

PDeviceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('PDevices', PDeviceSchema);