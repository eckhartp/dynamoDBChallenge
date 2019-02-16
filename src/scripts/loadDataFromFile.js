var DynamoDB = require("../../lib/DynamoDB.js");
var fs = require('fs'); 

var filename = './data/collarData.json'
var data = JSON.parse(fs.readFileSync(filename, 'utf8'));

DynamoDB.loadDataFromFile(data)