var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GatewaySchema = new Schema({
    serialNumber:{
        type: String,
        required: true,
        unique:true,
    },
    name:{
        type: String,
        required: true
    },
    ipAddress:{
        type: String,
        required: true,
    },
    perDevices: [{
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
            required: true,
            default: Date.now
        },
        status:{
            type: String,
            enum: ["online", "offline"]
        }
    }]
});

module.exports = mongoose.model('Gateway', GatewaySchema);