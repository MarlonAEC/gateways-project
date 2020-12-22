/**
 * @swagger
 *   tags:
 *       name: Gateways
 *       description: API to manage your gateways.
 * @swagger
 *  paths:
 *   /api/peripheral-devices:
 *      get:
 *          tags: [PeripheralDevices]
 *          summary: List all the peripheral devices
 *          responses:
 *              '200':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PeripheralDevice'
 *      post:
 *          tags: [PeripheralDevices]
 *          summary: Create a new Gateway
 *          consumes:
 *              - application/json
 *          parameters:
 *              - in: body
 *                name: peripheralDevice
 *                description: The peripheral device to create
 *                schema:
 *                  $ref: '#/components/schemas/PeripheralDevice'
 *          responses:
 *              '201':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PeripheralDevice'
 *   /api/peripheral-devices/{id}:
 *      get:
 *          tags: [PeripheralDevices]
 *          summary: List a peripheral device with id = {id}
 *          operationId: getPeripheralById
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Peripheral Device ID
 *                required: true
 *                shema:
 *                     type: string
 *          responses:
 *              '200':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PeripheralDevice'         
 *      delete:
 *          tags: [PeripheralDevices]
 *          summary: List a peripheral device with id = {id}
 *          operationId: deletePeripheralById
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Peripheral Device ID
 *                required: true
 *                shema:
 *                     type: string
 *          responses:
 *              '200':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PeripheralDevice'         
 */

const express = require('express');
const router = express.Router();
const Gateway = require('../models/gateway');
const Peripheral = require('../models/peripheralDevice');
const { check, validationResult } = require('express-validator');
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/peripheral-devices',function(req, res, next){
    Peripheral.find({}).then(function(gateways){
        res.json(gateways);
    }).catch(next);
})

router.post('/peripheral-devices',[
    check('gatewayId').notEmpty().withMessage('Please specify the gatewayId of gateway who owns this peripheral device'),
    check('uid').notEmpty().withMessage('This value should not be  blank!'),
    check('vendor').notEmpty().withMessage('This value should not be blank!'),
    check('status').notEmpty().withMessage("This value should not be blank!").isIn(["online", "offline"]).withMessage(`The value of status field should be "online" or "offline" invalid input please check!`)
],function(req, res, next){
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors){
        res.status(400).send(result);
    }
    Gateway.findById({_id: req.body.gatewayId}).then(async function(gatewayOwner){
        if(!gatewayOwner){
            var err = new Error();
            err.name = "Not Found";
            err.message = "404: The gateway you are trying to add a new peripheral device don't exist!";
            throw err;
        }
        if(gatewayOwner.perDevices.length >= 10){
            var err = new Error();
            err.name = "ValidationError";
            err.status = 422;
            err.message = "Only 10 peripheral devices per gateway are allowed!"
            throw err;
        }
        await Peripheral.create(req.body).then(function(result){
            gatewayOwner.perDevices.push(result._id);
            gatewayOwner.save(function(err){
                if(err){
                    throw err;
                }
            });
            res.status(201).send(result);
        }).catch(function(err){
            next(err);
        });
    }).catch(next);
})

router.delete('/peripheral-devices/:idPeripheral', function(req, res, next){
    Peripheral.findByIdAndDelete({_id: req.params.idPeripheral},function(err,result){
        if(!result){
            res.status(404).json({error: "Not Found!", message: `Object ${req.params.idPeripheral} not found please check input!`});
        }
        if(err){
            next(err)
        }
        Gateway.findOne({_id: result.gatewayId}).then(async function(gateway){
            gateway.perDevices = gateway.perDevices.filter((item)=>{
                item._id != result._id
            })
            await gateway.save(function(err){
                if(err){
                    next(err)
                }
            })
        })
        res.json(result);
    })
})

module.exports = router;