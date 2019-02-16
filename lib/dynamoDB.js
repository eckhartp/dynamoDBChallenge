var AWS = require('aws-sdk');
var fs = require('fs'); 
var config = require('../config/config')

const TABLE_NAME = config.aws_table_name

AWS.config.update(
    config.aws_local_config
);

if(AWS.config.credentials == null ){
    console.log("ERROR: AWS credentials. Check ~/.aws/crendentials file or environment variables!!!")
    process.exit(1)
}
console.log(AWS.config.credentials)

var dynamoDBClient = new AWS.DynamoDB.DocumentClient();


var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

//The BatchGetItem operation returns the attributes of one or more items from one or more tables. You identify requested items by primary key.
function batchGetItem(data, projectionExpression){

    if(projectionExpression != ""){
        var params = {
            RequestItems: {
                'code-challenge-203' : {
                    Keys: data,
                    ProjectionExpression: projectionExpression
                }
            }
        };
    }else{
        var params = {
            RequestItems: {
                'code-challenge-203' : {
                    Keys: data
                }
            }
        };
    }

    db.batchGetItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
    });
}

function batchWriteItem(data){

    var params = {
        RequestItems: {
            'code-challenge-203': data
        }
       };
    db.batchWriteItem(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response

    });
}

//todo: if deviceData does not exist run deviceData.js
function loadDataFromFile(data){
    data.forEach(function(device) {
        // console.log(JSON.stringify(device, null, 2))
        var params = {
            TableName: "code-challenge-203",
            Item: {
                "partitionKey" : device.partitionKey,
                "sortKey"      : device.sortKey,
                "motion"       : device.motion,
                "gps"          : device.gps,
            "audio"        : device.audio,
            "counters": device.counters
        }
    };    
    putItem(params)
    });
}

function getItem(params){
    dynamoDBClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            if(Object.keys(data).length === 0 && data.constructor === Object){
                console.log("ITEM DOES NOT EXIST IN TABLE")
            }else{
                console.log("Get Item succeeded:", JSON.stringify(data, null, 2));
            }
        }
    });
}

function putItem(params){
    dynamoDBClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add data", params.Item.sortKey, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Put Item succeeded:", params.Item.sortKey);
        }
    });
}

function updateItem(options){
    console.log(JSON.stringify(options, null, 2));
    var params = {
        TableName:      TABLE_NAME,
        Key : options.Key,
        UpdateExpression: options.UpdateExpression,
        ExpressionAttributeValues: options.ExpressionAttributeValues,
        ReturnValues:"UPDATED_NEW"
    };
    console.log(JSON.stringify(params, null, 2));
    console.log("Updating the item...");
    dynamoDBClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

function incrementCounter(key, countToIncrement){
    var options = {
            Key: key,
            UpdateExpression: "set counters."+countToIncrement+" = counters."+countToIncrement+" + :val",
            ExpressionAttributeValues : {
                            ":val": 1
                            }
        }
        console.log(JSON.stringify(options, null, 2));
    updateItem(options)
}

function deleteItem(partitionKey, sortKey){
    var params = {
        TableName:TABLE_NAME,
        Key:{
            "partitionKey": partitionKey,
            "sortKey": sortKey
        } 
    };

    console.log("Deleteing the item...");
    dynamoDBClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Delete Item succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

function conditionalDeleteItem(options){

    var params = {
        TableName:TABLE_NAME,
        Key:options.Key,
        ConditionExpression: options.ConditionExpression,
        ExpressionAttributeValues: options.ExpressionAttributeValues
        };

    console.log("Deleteing the item...");
    dynamoDBClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Delete Item succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

function queryTable(options){
    console.log("Querying...");

    var params = {
        TableName : TABLE_NAME,
        KeyConditionExpression:     options.KeyConditionExpression,
        ExpressionAttributeNames:   options.ExpressionAttributeNames,
        ExpressionAttributeValues:  options.ExpressionAttributeValues
    };

    dynamoDBClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(item.partitionKey + ": " + item.sortKey);
            });
        }
    });
}

function queryTable2(options){
    console.log("Querying...");

    var params = {
        TableName :                 TABLE_NAME,
        ProjectionExpression:       options.ProjectionExpression,
        KeyConditionExpression:     options.KeyConditionExpression,
        ExpressionAttributeNames:   options.ExpressionAttributeNames,
        ExpressionAttributeValues:  options.ExpressionAttributeValues
    };

    dynamoDBClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            
            data.Items.forEach(function(item) {
                console.log(item.partitionKey + ": " + item.sortKey+" x.val: "+item.motion.x);
            });
        }
    });
}

function scanTable(options){
    var params = {
        TableName:                  TABLE_NAME,
        ProjectionExpression:       options.ProjectionExpression,
        FilterExpression:           options.FilterExpression,
        ExpressionAttributeNames:   options.ExpressionAttributeNames,
        ExpressionAttributeValues:  options.ExpressionAttributeValues
    };

    console.log("Scanning "+TABLE_NAME);
    dynamoDBClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function(device) {
            console.log(
                    device.partitionKey + ": ",
                    device.sortKey, "- x val:", device.motion.x);
            });

            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                dynamoDBClient.scan(params, onScan);
            }
        }
    }
}
//todo: create a function to conditionally increment counters based on data in request

module.exports.loadDataFromFile = loadDataFromFile
module.exports.batchGetItem = batchGetItem
module.exports.getItem = getItem
module.exports.putItem = putItem
module.exports.updateItem = updateItem
module.exports.incrementCounter = incrementCounter
module.exports.deleteItem = deleteItem
module.exports.conditionalDeleteItem = conditionalDeleteItem
module.exports.queryTable = queryTable
module.exports.queryTable2 = queryTable2
module.exports.scanTable = scanTable
module.exports.batchWriteItem = batchWriteItem
module.exports.TABLE_NAME = TABLE_NAME