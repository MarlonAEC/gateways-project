const express = require('express');
const router = express.Router();
const Peripheral = require('../models/peripheralDevice');
const Gateway = require('../models/gateway');
const { check } = require('express-validator');

router.get('/peripheral-devices', function(req, res, next){
    Peripheral.find({}).then(function(peripherals){
        res.send(peripherals);
    }).catch(next);
});

router.get('/peripheral-devices/:id', function(req, res){
    Peripheral.findById({_id: req.params.id}).then(function(peripheral){
        if(!peripheral){
            res.status(404).send(`Object ${req.params.id} not found`);
        }else{
            res.send(peripheral);
        }
    })
});

module.exports = router;