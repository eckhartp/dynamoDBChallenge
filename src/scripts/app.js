var DynamoDB = require("../../lib/DynamoDB.js");

//called when device comes online for the very first time. Never called again
//partition key is a string composed of modelnumber+macAddress
//sort key is a string with millisecond of epoch time the payload was created
api.post('/deviceInit', function (request) { 
    var params = {  
        TableName: TABLE_NAME,  
        Item: {
            partitionKey: request.body.partitionKey,
            sortKey: request.body.sortKey 
        } 
    }
    DynamoDB.putItem(params)
})

//called when collar is detecting motion and barking
//data should contain modelandDeviceID, millisecond ts, array of motion data,array of audio data, gps location
api.post('/highlyActive', function (request) { 
    //contains 2 seconds worth of audion and motion data
    DynamoDB.batchWriteItem(data)
}); 

//increments an atomic counter increment every time the dog extends the predfined radius
  api.post('/onTheLoose', function (request) { 
    
    DynamoDB.incrementCounter({
        "partitionKey": partitionKey,
        "sortKey": sortKey
    }, countToIncrement)
}); 

//increments an atomic counter when the audio is identified as being high pitched
api.post('/franticBark', function (request) { 
    
    DynamoDB.incrementCounter({
        "partitionKey": partitionKey,
        "sortKey": sortKey
    }, countToIncrement)
}); 

//increments an atomic counter when the audio is identified as being low or growling
api.post('/franticBark', function (request) { 
    
    DynamoDB.incrementCounter({
        "partitionKey": partitionKey,
        "sortKey": sortKey
    }, countToIncrement)
});

//increments an atomic counter when audio is a somewhat constant high pitcH?
api.post('/crying', function (request) { 
    
    DynamoDB.incrementCounter({
        "partitionKey": partitionKey,
        "sortKey": sortKey
    }, countToIncrement)
}); 


//TODO in case device every needs to get data
// api.get('/ ', function (request) { // GET all users
//   return dynamoDb.scan({ TableName: 'icecreams' }).promise()
//       .then(response => response.Items)
// });

