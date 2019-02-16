var DynamoDB = require("../../lib/DynamoDB.js");
var fs = require('fs'); 

var filename = './data/deviceData.json'
var data = JSON.parse(fs.readFileSync(filename, 'utf8'));

var projectionExpression = ""
DynamoDB.batchGetItem(data, projectionExpression)