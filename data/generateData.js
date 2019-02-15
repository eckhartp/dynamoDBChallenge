const uuidv1 = require('uuid/v1');
var fs = require('fs'); 
var datetime = require('node-datetime');

var data = []
for(var i=0; i < 100; i++){
    var now = Date.now()
    var sortKey = datetime.create(now)
    data.push(
        {
            "partitionKey" : uuidv1(),
            "sortKey" : sortKey._created,
            "motion" : {
                    "x" : 123,
                    "y" : 456,
                    "z" : 789
                },
            "gps" : {
                "latitude": {
                    "direction": "N",
                    "degrees": i,
                    "minutes": Math.abs(60-i),
                    "seconds": Math.abs(60-i)/30
                },
                "longitude" : {
                    "direction": "E",
                    "degrees": 360-i,
                    "minutes": Math.abs(40-i),
                    "seconds": Math.abs(15-i)/30
                } 
            },
            "audio" : [2000,2050,2500,2000,1850]
        }
    )
}

const content = JSON.stringify(data);

fs.appendFile('./data/collarData.json', content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 