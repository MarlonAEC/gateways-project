/**
 * /
 * @swagger
 *   components:
 *       schemas:
 *          PeripheralDevice:
 *              type: object
 *              required:
 *                  - uid
 *                  - vendor
 *                  - status
 *                  - gatewayId
 *              properties:
 *                  uid:
 *                      type: integer
 *                      description: An identifier for the peripheral device
 *                  vendor:
 *                      type: string
 *                      description: The vendor of the peripheral devices
 *                  date:
 *                      type: datetime
 *                      description: The date that the peripheral device was created
 *                  status:
 *                      type: string
 *                      description: The status of the peripheral device
 *                      enum: ["online", offline]
 *                  gatewayId: 
 *                      type: object
 *                      schema:
 *                          $ref: '#/components/schemas/Gateway'
 *              example:
 *                  uid: 1232
 *                  vendor: Cisco
 *                  status: online
 *                  date: 2020-10-12
 *                  gatewayId: 123
 *                  
 *          Gateway:
 *              type: object
 *              required:
 *                  - serialNumber
 *                  - name
 *                  - ipAddress
 *                  - status
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The auto-generated id of the gateway.
 *                  serialNumber:
 *                      type: string
 *                      description: The serial number of the gateway.
 *                  name:
 *                      type: string
 *                      description: The human readable name of the gateway
 *                  perDevice:
 *                      type: array
 *                      description: The status of the gateway
 *                      items:
 *                          $ref: '#/components/schemas/PeripheralDevice'
 *                      example:
 *                          - uid: 1
 *                            vendor: Some vendor
 *              example:
 *                  serialNumber: 123
 *                  name: Gateway 1
 *                  ipAddress: 10.10.1.5
 *                  perDevice: [
 *                  ]
 *                  
 * @swagger
 *   tags:
 *       name: Gateways
 *       description: API to manage your gateways.
 * @swagger
 *  paths:
 *   /api/gateways:
 *      get:
 *          tags: [Gateways]
 *          summary: List all the gateways
 *          responses:
 *              '200':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Gateway'    
 *      post:
 *          tags: [Gateways]
 *          summary: Create a new Gateway
 *          consumes:
 *              - application/json
 *          parameters:
 *              - in: body
 *                name: gateway
 *                description: The gateway to create
 *                schema:
 *                  $ref: '#/components/schemas/Gateway'
 *          responses:
 *              '201':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Gateway'
 *   /api/gateways/{id}:
 *      get:
 *          tags: [Gateways]
 *          summary: List all the gateways
 *          operationId: getGatewayById
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Gateway ID
 *                required: true
 *                shema:
 *                     type: integer
 *                     format: int64
 *          responses:
 *              '200':
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Gateway'         
 */

const express = require('express');
const router = express.Router();
const Gateway = require('../models/gateway');
const Peripheral = require('../models/peripheralDevice');
const { check, validationResult } = require('express-validator');
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/gateways', function(req, res, next){
    Gateway.find({}).populate('perDevices')
        .then(function(gateways){
        res.json(gateways);
    }).catch(next);
});

router.get('/gateways/:id', function(req, res, next){
    Gateway.findOne({
        _id: req.params.id
    }).populate('perDevices').catch(next).then(function(gateway){
        res.json(gateway);
    }).catch(next);
})
/**
 * CHECKED!
 */
router.post('/gateways', [
    check('serialNumber').notEmpty().withMessage("This value should not be blank"),
    check('name').notEmpty().withMessage("This value should not be blank"),
    check('ipAddress').isIP().withMessage("Please enter a valid IP Address")
        .notEmpty().withMessage("This value should not be blank")
],async function(req, res, next){
    console.log(req.body);
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors){
        res.status(400).send(result);
    }
    if(req.body.perDevices.length > 10){
        res.status(422).send({
            name: "ValidationError",
            description: "Only 10 peripheral devices per gateway are allowed!"
        });
    }
    newGateway = new Gateway({
        _id: new mongoose.Types.ObjectId(),
        ipAddress: req.body.ipAddress,
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        perDevices: []
    });

    var errors = false;
    var arrayOfPeripheralDevices = [];
    req.body.perDevices.map(item => {
        newPeripheral = new Peripheral(item);
        newPeripheral.gatewayId = newGateway._id;
        newGateway.perDevices.push(newPeripheral._id);
        arrayOfPeripheralDevices.push(newPeripheral);
    });

    await Peripheral.insertMany(arrayOfPeripheralDevices).then(function(){
        newGateway.save().then(function(err){
            res.status(201).json({message: "Gateway successfully added!", gateway: newGateway});
        }).catch(async function(err){
            for(var i = 0;i < arrayOfPeripheralDevices.length;i++){
                await Peripheral.findOneAndRemove({_id: arrayOfPeripheralDevices[i]})
            }
            err.status = 400;
            next(err);
        })
    }).catch((err)=>{
        err.status = 400;
        next(err)
    })
});

router.post('/gateways/:id/peripheral-devices',function(req, res, next){
    Gateway.findById({_id:req.params.id}).then(function(gateway){
        if(!gateway){
            var err = new Error();
            err.name = "Not Found";
            err.status = 404;
            err.message = `Gateway object ${req.params.id} not found in the database please check input!`;
            throw err;
        }else{
            if(gateway.perDevices.length >= 10){
                var err = new Error();
                err.name = "ValidationError";
                err.message = "Only 10 peripheral devices per gateway are allowed!"
                throw err;
            }
            newPeripheral = new Peripheral(req.body);
            newPeripheral.date = new Date();
            newPeripheral.gatewayId = gateway._id;
            newPeripheral.save(function(err){
                if(err){
                    res.status(422).json(err);
                }
            });
            gateway.perDevices.push(newPeripheral._id);
            gateway.save(function(err){
                if(err){
                    res.status(422).json(err);
                }
                res.status(200).send(gateway);
            });
        }
    }).catch(next);
});

// router.put('/gateways/:id', function(req, res, next){
//     Gateway.findOneAndUpdate({
//         _id: req.params.id
//     }, req.body).then(function(){
//         Gateway.findOne({_id: req.params.id}).then(function(gateway){
//             if(!gateway){
//                 res.status(404).send(`Object ${req.params.id} Not Found`);
//             }
//             res.status(200).send(gateway);
//         })
//     }).catch(next);
// });

router.delete('/gateways/:id', function(req, res, next){
    Gateway.findByIdAndDelete({_id:req.params.id}).then( async function(gateway){
        if(!gateway){
            res.status(404).send(`Object ${req.params.id} Not Found`);
        }
        else{
            await gateway.perDevices.map((item)=>{
                Peripheral.remove(item, function(err){
                    if(err){
                        next(err);
                    }
                });
            }) 
            
            res.status(201).send(gateway);
        }
        
    }).catch(next)
});

module.exports = router;