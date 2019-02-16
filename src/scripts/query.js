var DynamoDB = require("../../lib/DynamoDB.js");
var inquirer = require('inquirer');
var fs = require('fs'); 

//TODO fix errors to make this work

// var Questions = [
//     {
//         type: 'Input',
//         name: 'partitionKey',
//         message: 'Enter the partition key'
//     },
//     {
//         type: 'Input',
//         name: 'projectionExpression',
//         message: 'Enter the desired Projection Expression'
//     },
//     {
//         type: 'Input',
//         name: 'KeyConditionExpression',
//         message: 'Enter the Key Condition Expression'
//     },
//     {
//         type: 'Input',
//         name: 'filename',
//         message: 'Enter the file that contains the Expresion Attributes and Expression Values'
//     }
// ]
// function getInfo(){
//     return inquirer.prompt(Questions).then(ans => {
//         console.log(ans)

//         var filename = ans.filename
//         var data = JSON.parse(fs.readFileSync(filename, 'utf8'));
//         data[":p"] = ans.partitionKey  
//         var options = {
//             ProjectionExpression: ans.projectionExpression,
//             KeyConditionExpression: ans.KeyConditionExpression,
//             ExpressionAttributeNames:data.ExpressionAttributeNames,
//             ExpressionAttributeValues: data.ExpressionAttributeValues
//         }
//         DynamoDB.queryTable2(options)
//     })
// }

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
// getInfo()