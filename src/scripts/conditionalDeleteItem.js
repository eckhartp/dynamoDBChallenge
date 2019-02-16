var DynamoDB = require("../../lib/DynamoDB.js");
const X_VAL = 10

var partitionKey = "1"
var sortKey = "545bf2f9-3169-11e9-96c4-8ff0bb9f7c50"

var options = {
    Key:{
        "partitionKey": partitionKey,
        "sortKey": sortKey
    },
    ConditionExpression: "motion.x < :val",
    ExpressionAttributeValues: {
        ":val": X_VAL
    }
}

DynamoDB.conditionalDeleteItem(options)