/*
 * Project: generic-node-dashboard
 * File: index.js
 * Author: Emil Nilsson
 * Contact: emil.nilsson@nutanix.com
 */

let express = require('express');
let app = express();
const server = require('http').Server(app);
const NATS = require('nats') // Require the NATS module
const io = require('socket.io')(server);
const isBase64 = require('is-base64');

// Create a connection to the NATS demo server
console.log("Trying to connect to NATS at " + process.env.NATS_PORT_4222_TCP);
const nc = NATS.connect({
    url: process.env.NATS_PORT_4222_TCP
}); 

app.set('view engine', 'ejs');

//set upp public directory to serve static files
app.use(express.static('public'));


io.on('connection', function (socket) {
    // Subscribe to the "messages" topic
    console.log("Subbed to: " + process.env.LEFT_ENDPOINT);
    nc.subscribe(process.env.LEFT_ENDPOINT, (msg) => {
        console.log(msg);
        try {
            var json_payload = JSON.parse(String(msg).substring(String(msg).indexOf("{")))
            if(isBase64(json_payload.frame)){
                socket.emit('left', JSON.stringify(json_payload));
            }
            else {
                console.log("Not base64")
            }
        }
        catch(err){
            console.log("Bad JSON " + err)
        }

        
    });
    console.log("Subbed to: " + process.env.RIGHT_ENDPOINT);
    nc.subscribe(process.env.RIGHT_ENDPOINT, (msg) => {
        console.log(msg);
        try {
            var json_payload = JSON.parse(String(msg).substring(String(msg).indexOf("{")))
            if(isBase64(json_payload.frame)){
                socket.emit('right', JSON.stringify(json_payload));
            }
            else {
                console.log("Not base64")
            }
        }
        catch(err){
            console.log("Bad JSON " + err)
        }
    });
});


app.get('/', (req, res) => {
  res.render('index');
});

server.listen(4000);
console.log("Service running on port 4000");