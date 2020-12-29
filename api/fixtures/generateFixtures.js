const GatewaySchema = require('../models/gateway');
const Peripheral = require('../models/peripheralDevice');
var mongoose = require('mongoose');
const { generateHTML } = require('swagger-ui-express');

const serialNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const names = ["Wrapsafe", "Greenlam", "Flexidy", "Transcof", "Kanlam", "Subin", "Voltsillam", "Sonair", "Mat Lam Tam", "Aerified", "Toughjoyfax", "Aerified"];
const ipAddresses = ["143.196.28.40", "87.183.34.129", "213.201.169.219", "66.238.46.243", "61.45.13.211", "13.185.240.101", "132.57.24.52", "18.135.100.150", "109.66.8.209", "163.240.40.22", "142.58.215.42", "37.148.63.173"];
let iniId = 0;
let finId = 10;
const status = ["online", "offline"];
const vendors = ["Thoughtworks", "Devpoint", "Skyndu", "Babbleopia", "Digitube", "Linklinks","Yozio","Yodel","Topicshots","Meembee","Realpoint","Vidoo"];

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function generateUniqueUid(amount, ini, fin){
    let sol = [], count = 0, i = ini;
    while(count < amount){
        sol.push(i);
        i++;
        count++;
    }
    return sol;
}

async function createFixtures(){
    for(let i = 0;i < 12;i++){
        let gateway = new GatewaySchema();
        gateway._id = new mongoose.Types.ObjectId();
        gateway.serialNumber = serialNumbers[i];
        gateway.ipAddress = ipAddresses[i];
        gateway.name = names[i];
        const amountOfPeripherals = Math.floor(Math.random() * 10);
        let arrayOfUniqueUids = [];
        arrayOfUniqueUids = generateUniqueUid(amountOfPeripherals, iniId, finId);
        for(let j = 0; j < amountOfPeripherals; j++){
            let peripheral = new Peripheral();
            peripheral._id = new mongoose.Types.ObjectId();
            peripheral.uid = arrayOfUniqueUids[j];
            peripheral.date = new Date();
            peripheral.vendor = vendors[getRandomIndex(1, 12)];
            peripheral.status = status[getRandomIndex(0,1)];
            peripheral.gatewayId = gateway._id;
            await peripheral.save(function(err){
                if(err){
                    console.log("Error creating peripheral devices fixture");
                }
            })
            gateway.perDevices.push(peripheral._id);
        }
        iniId += 11;
        finId += 11;
        await gateway.save(function(err){
            if(err){
                console.log("Error creating gateway fixture", err);
            }
        })
    }
}

module.exports = createFixtures;