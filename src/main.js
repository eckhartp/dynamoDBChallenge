var AWS = require("aws-sdk");
var http = require('http');
var fs = require('fs'); 


AWS.config.update({
  region: "us-east-2",
  });

console.log(AWS.config.credentials)

var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
 });

 var docClient = new AWS.DynamoDB.DocumentClient();

 console.log("Importing data into DynamoDB. Please wait.");
 
 var data = JSON.parse(fs.readFileSync('./data/collarData.json', 'utf8'));
 data.forEach(function(device) {
     console.log(JSON.stringify(device, null, 2))
     var params = {
         TableName: "code-challenge-203",
         Item: {
             "partitionKey" : device.partitionKey,
             "sortKey"      : device.sortKey,
             "motion"       : device.motion,
             "gps"          : device.gps,
             "audio"        : device.audio
         }
     };

     console.log(JSON.stringify(params.Item, null, 2));
 
     docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add data", data.sortKey, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", data.sortKey);
        }
     });
 });
