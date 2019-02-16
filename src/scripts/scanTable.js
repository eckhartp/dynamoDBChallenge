var DynamoDB = require("../../lib/DynamoDB.js");

options = {
    ProjectionExpression: "#p, sortKey, motion.x",
    FilterExpression: "#p between :start and :end",
    ExpressionAttributeNames: {
            "#p": "partitionKey",
        },
    ExpressionAttributeValues: {
        ":start": "1550259306802",
        ":end": "1550259306802" 
    }
}

DynamoDB.scanTable(options)