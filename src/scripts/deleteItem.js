var DynamoDB = require("../../lib/DynamoDB.js");

var partitionKey = "1000c2a690c9740"
var sortKey = "1550342534173"

DynamoDB.deleteItem(partitionKey, sortKey)