var DynamoDB = require("../../lib/DynamoDB.js");
var fs = require('fs'); 


var filename = './data/putDeviceData.json' 
var data = JSON.parse(fs.readFileSync(filename, 'utf8'));

DynamoDB.batchWriteItem(data)