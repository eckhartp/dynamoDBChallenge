var DynamoDB = require("../../lib/DynamoDB.js");

var getParams = {
    TableName: DynamoDB.TABLE_NAME,
    Key:{
        "partitionKey": "1",
        "sortKey": "545b56b0-3169-11e9-96c4-8ff0bb9f7c50"
    }
  }
  
  DynamoDB.getItem(getParams)