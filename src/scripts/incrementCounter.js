var DynamoDB = require("../../lib/DynamoDB.js");

var partitionKey = "1"
var sortKey = "545bf2f9-3169-11e9-96c4-8ff0bb9f7c50"

var countToIncrement = "onTheLoose"
DynamoDB.incrementCounter({
        "partitionKey": partitionKey,
        "sortKey": sortKey
    }, countToIncrement)