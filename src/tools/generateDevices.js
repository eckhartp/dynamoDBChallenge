const uuidv1 = require('uuid/v1');
var fs = require('fs'); 
var datetime = require('node-datetime');

var data = []
for(var i=0; i < 100; i++){
    var model = i%10
    data.push(
        {
            "partitionKey" : "c2a690c974"+model.toString(),
            "sortKey" : uuidv1()
        }
    )
}

const content = JSON.stringify(data);

fs.appendFile('./data/deviceData.json', content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 