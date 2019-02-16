var DynamoDB = require("../../lib/DynamoDB.js");

var getParams = {
    TableName: DynamoDB.TABLE_NAME,
    Key:{
        "partitionKey": "1000c2a690c9740",
        "sortKey": "1550342534173"
    }
  }
  
  DynamoDB.getItem(getParams)
