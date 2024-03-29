const uuidv1 = require('uuid/v1');
var fs = require('fs'); 
var datetime = require('node-datetime');

var data = []

for(var i=0; i < 100; i++){
    var device = i%10
    if (i < 50){
        var model = "1000"
    }else{
        model = "2000"
    }
   
    var now = datetime.create();
    now.now();
    data.push(
        {
            "partitionKey" : model+"c2a690c974"+device,
            "sortKey" : now.now()
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