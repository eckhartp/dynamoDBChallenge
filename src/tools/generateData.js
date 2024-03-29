const uuidv1 = require('uuid/v1');
var fs = require('fs'); 
var datetime = require('node-datetime');

var data = []
for(var i=0; i < 20; i++){
    var now = datetime.create();
    var device = i%10
    if (i < 50){
        var model = "1000"
    }else{
        model = "2000"
    }
    data.push(
        {
            "partitionKey" : model+"c2a690c974"+device,
            "sortKey" : now.now().toString(),
            "motion" : {
                    "x" : 300,
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
            "audio" : [2000,2050,2500,2000,1850],
            "counters": {
                "onTheLoose": 0,
                "franticBark": 0,
                "meanBark": 0,
                "running": 0,
                "jumping": 0
            }
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