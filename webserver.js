const express = require('express');
const path = require('path');
const io = require("socket.io-client");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({strict: false}))
const socket = io.connect('http://localhost:8181/arduino');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});
app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/assets/favicon.ico'));
});
app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.js'));
});
app.get('/config', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/arduino_config.json'));
});
app.get('/card', function(req, res) {
    res.sendFile(path.join(__dirname, '/response/command_card.html'));
});
app.get('/assets/icons',function(req, res) {
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
    /*
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
app.post('/command', (req, res) => {
    const jsonReq = req.body;
    if (jsonReq.hasOwnProperty("relay") && typeof(jsonReq.relay) == "number" && jsonReq.hasOwnProperty("action")){
        console.log("received: " , jsonReq)
        const relay = jsonReq.relay;
        if (jsonReq.action === "open"){
            if(relay > 0 && relay < 9){
                let val = relay + 4;
                socket.emit(`relay`,val);
                console.log(`Sent: ${val}`, " = " + relay + " + offset(4)");
                socket.on('success', () =>{
                    res.sendFile(path.join(__dirname, '/response/open_success.html'));
                })
            } else {
                res.sendFile(path.join(__dirname, '/response/open_failure.html'))
            }
        } else if (jsonReq.action === "delete" || jsonReq.action === "edit"){
            res.sendFile(path.join(__dirname, '/response/work_in_progress.html'))
        }
    } else {
        res.sendFile(path.join(__dirname, '/response/open_failure.html'))
    }
});

app.listen(port, function () {
    console.log('Server started at http://localhost:' + port);
});