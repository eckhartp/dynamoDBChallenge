var DynamoDB = require("../../lib/DynamoDB.js");

var options = {
    KeyConditionExpression: "#p = :v",
    ExpressionAttributeNames:{
        "#p": "partitionKey"
    },
    ExpressionAttributeValues: {
        ":v": "1550259306802"
    }
}

DynamoDB.queryTable(options)