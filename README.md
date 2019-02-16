# dynamoDBChallenge
This repo contains helper functions to work progammatically with a previously created table in DynamoDB, an application that sets up some routes to allowa a device to send data to DynamoDB(NOT FULLY DEVELOPED OR TESTED AT ALL!!), and some tools to help generate data to load into a prevously created table.

# The Data Collar(Beginning Concept)
The dog collar contains a 9 DOF motion sesnor, a microphone, an ADC(audio processing), spiflash, and an gps IC. When the motion sensor detects motion or the audio detects frequencies that indicate barking the device will begin to poll the sensors and store data in spiflash. Every two seconds a payload of the collected motion, audio, and gps data will be sent to DynamoDB. 

# Get Started

1. Download Nodejs from https://nodejs.org/en/download/

1.    Clone the dynamoDbChallenge repository
    
        `git clone https://github.com/eckhartp/dynamoDBChallenge.git`

2. `cd` into the directory of the cloned repo.
         
     `cd dynamoDBChallenge`

3.  Install the required node modules

      `npm install`

      **NOTE:** On a Unix system, you may need to use *sudo*: `sudo npm install`.

# Set Credentials

Accessing AWS programmatically, an access key is required to verify your identity and the identity of your applications. An access key consists of an access key ID and a secret access key. These credentials need to be stored locally on your computer. A shared credentials file can be used or environment variables can be set.
#### Shared Credntials file
1. In a text editor paste the following:

        [default]
        aws_access_key_id = YOUR_AWS_ACCESS_KEY_ID
        aws_secret_access_key = YOUR_AWS_SECRET_ACCESS_KEY
2.  Save the file as credential with no extenstion in .aws folder that you create using the following command:
    
    Windows:
        
        mkdir "%UserProfile%\.aws
    
    Linux:
    
        mkdir ~/.aws
#### Environment Variables
Run the following commands from the terminal. The credentials will only be set for the current termainal session. They will not persist to a new terminal or restart.

`$env:AWS_SECRET_ACCESS_KEY=<YOUR AWS SECRET ACCESS KEY>`
`$env:AWS_ACCESS_KEY_ID=<YOUR AWS KEY ID>`

<YOUR AWS SECRET ACCESS KEY> and <YOUR AWS KEY ID> can be obtained by choosing sercurity credentials from your username drop down menu located in the top right of your AwS account

# Set Congiuration

1. In a text editor paste the following:

        module.exports = {
            aws_table_name: 'Your table name',
            aws_local_config: {
                region: 'aws region',
                endpoint: 'https://dynamodb.<awsregion>.amazonaws.com'
            }
        };

2. Create a folder named config.
3. Save the file as ./config/config

# Ready to Run
## Scripts
The `src/scripts` folder contains node scripts to demonstrate how to use the helper functions found in `lib/dynamoDB.js` with are designed to programmatically interact with DynamoDB. Below is a brief description of each script.<br>
<br>Run `node *scriptName.js*` to execute the script.

| Script                        | Description |
| -----------                   | ----------- |
| conditionalDeleteItem.js      | Deletes an item from the table if it meets the specifed condition       |
| deleteItem.js                 | Deletes the time with the specified parition key and sort key        |
| getItem.js                    | Gets an item with the specified partition key and sort key        |
| incrementCounter.js           | Increments one of six atomic atomic counters      |
| main.js                       | Text        |
| putItem.js                    | Adds the defined item to the table        |
| query.js                      | Finds and returns the specified item        |
| queryTable.js                 | Finds and returns the specified attributes of a specified item        |
| scanTable.js                  | Text        |
| updateItem.js                 | Text        |

-: 
**The scripts default to using the table named **'code-challenge-203'**. To change the name of the table, redefine the const TABLE_NAME found in `lib/dynamoDB.js`






#schema
partitionKey    : model number and collar mac address
sortKey         : mac address of dog collar
motion      : an array of motion data samples from some predefined duration of time
gps         : location data last polled gps coordinates - sent at regular intervals or more frequently when triggered
audio       : an array of frequencis from some predefined duration of time included in payload only if values > 1000 Hz
counters    : an array of atomic counters that track the number of times a dog enters a particular state


50 samples every 2 seconds
model0000 epoch time
model001000 epoch time



never more than once every two seconds
partitionKEy model+deviceID
sortKey timestamp

device wakesup on bark or motion
while there is motion or barking the device will collect data for two seconds and then send to cloud
if barking and motion stop and location outside of predefined max radius gps location sent every two seconds