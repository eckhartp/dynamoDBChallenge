var DynamoDB = require("../../lib/DynamoDB.js");

var putParams = {
    "TableName": DynamoDB.TABLE_NAME,
    "Item":{
        "partitionKey":"100001000",
        "sortKey":"1550250298008",
        "motion":{"x":123,"y":456,"z":789},
        "gps":{
            "latitude":{"direction":"N","degrees":0,"minutes":60,"seconds":2},
            "longitude":{"direction":"E","degrees":360,"minutes":40,"seconds":0.5}
        },
        "audio":[2000,2050,2500,2000,1850],
        "counters":{
            "onTheLoose":0,
            "franticBark":0,
            "meanBark":0,
            "running":0,
            "walking":0,
            "jumping":0
        }
    }
}

DynamoDB.putItem(putParams)