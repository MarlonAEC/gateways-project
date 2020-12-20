const express = require('express');
const router = express.Router();
const Gateway = require('../models/gateway');

router.get('/gateways', function(req, res, next){
    res.send("GET");
    Gateway.find({}).exec(function(err,gateways){
        if(err){
            res.send('error ocurred');
        }else{
            res.send(gateways);
        }
    })
});

router.get('/gateways/:id', function(req, res, next){
    Gateway.findById({
        _id: req.params.id
    }).catch(next);
})

router.post('/gateways', function(req, res, next){
    Gateway.create(req.body).then(function(gateway){
        res.send(gateway);
    }).catch(next);
});

router.put('/gateways', function(req, res, next){
    // Gateway.findOneAndUpdate({
    //     _id: req.params.id
    // })
});

router.delete('/gateways', function(req, res, next){
    console.log(req.body);
    res.send({type:'DELETE'});
});

module.exports = router;