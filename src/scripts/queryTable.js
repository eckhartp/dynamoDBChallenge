var DynamoDB = require("../../lib/DynamoDB.js");

//TODO require('inquirier') and create prompts to obtain the options values

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