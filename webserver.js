const express = require('express');
const path = require('path');
const io = require("socket.io-client");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({strict: false}))
const socket = io.connect('http://localhost:8181/arduino');// connect to arduino.js via a scoket

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html')); //send index file
});
app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/assets/favicon.ico')); //send favicon
});
app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.js')); //send main javascript
});
app.get('/config', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/arduino_config.json')); //send configuration of the relays to build the index interface
});
app.get('/card', function(req, res) {
    res.sendFile(path.join(__dirname, '/response/command_card.html')); //send the template of the card to populate with /config data
});
app.get('/assets/icons',function(req, res) { //send various icons
    switch (req.query.icon){
        case '1' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_1.png')); break
        case '2' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_2.png')); break
        case '3' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_3.png')); break
        case '4' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_4.png')); break
        case '5' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_5.png')); break
        case '6' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_6.png')); break
        case '7' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_7.png')); break
        case '8' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_8.png')); break
        case '9' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_9.png')); break
        case '10' : res.sendFile(path.join(__dirname, '/client/assets/icons/icon_10.png')); break
        default : res.sendFile(path.join(__dirname, '/client/assets/favicon.ico'));
    }
    /* alternative code for the icons that could work better, especially with lots of icons
    let flag = 1;
    while(flag !== 0){
        if(parseInt(req.query.icon) === flag){
            res.sendFile(path.join(__dirname, `/client/assets/icons/icon_${flag}.png`));
            flag = -1;
        }
        if(flag === 11){
            res.sendFile(path.join(__dirname, `/client/assets/favicon.ico`));
            flag = -1;
        }
        flag ++
    }
     */

});
app.post('/command', (req, res) => { //main function for sending commands to arduino.js
    const jsonReq = req.body; //gets the content of the request

    if (jsonReq.hasOwnProperty("relay") && typeof(jsonReq.relay) == "number" && jsonReq.hasOwnProperty("action")){ // check if request has the right content

        console.log("received: " , jsonReq) //show the content on server console
        const relay = jsonReq.relay;

        if (jsonReq.action === "open"){
            if(relay > 0 && relay < 9){

                let val = relay + 4; //offset the value of relay to match the one on arduino board
                socket.emit(`relay`,val); //send the relay and its number to arduino.js
                console.log(`Sent: ${val}`, " = " + relay + " + offset(4)\n"); //show on server console what was sent to arduino
                res.sendFile(path.join(__dirname, '/response/open_success.html')); //success msg if command was right

            } else {
                res.sendFile(path.join(__dirname, '/response/open_failure.html')) //if relay number is not right, send error msg
            }
        } else if (jsonReq.action === "delete" || jsonReq.action === "edit"){ //edit and delete options not implemented yet
            res.sendFile(path.join(__dirname, '/response/work_in_progress.html'))
        }
    } else {
        res.sendFile(path.join(__dirname, '/response/open_failure.html')) //if wrong command, send error msg
    }
});

socket.on('keepalive_msg', (msg) =>{
    console.log("keepalive: ", msg) //show the keepalive and the date at the time of reception
})
app.listen(port, function () {
    console.log('Server started at http://192.168.1.252:' + port + "\n-----------------\n"); //tell we are ready!
});