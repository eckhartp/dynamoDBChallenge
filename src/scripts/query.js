var DynamoDB = require("../../lib/DynamoDB.js");

partitionKey = "1550259306802"
var options = {
    ProjectionExpression: "#p, sortKey, motion.x, gps.latitude",
    KeyConditionExpression: "#p = :p and sortKey between :time1 and :time2",
    ExpressionAttributeNames:{
            "#p": "partitionKey"
        },
    ExpressionAttributeValues: {
        ":p": partitionKey,
        ":time1": "cc6bf120-3158-11e9-8cf7-77fd4ac02dcd",
        ":time2": "cc6bf126-3158-11e9-8cf7-77fd4ac02dcd"
    }
}

DynamoDB.queryTable2(options)