const express = require('express');
const path = require('path');
const io = require("socket.io-client");
const app = express();
const port = 8081;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({strict: false}))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, '/assets/favicon.ico'));
});
app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.js'));
});

app.post('/comando', (req, res) => {
    const jsonReq = req.body;
    if (jsonReq.hasOwnProperty("relay") && typeof(jsonReq.relay) == "number"){
        console.log("received: " , jsonReq)
        const relay = jsonReq.relay;
        const socket = io.connect('http://localhost:8080/arduino');
        if(relay > 0 && relay < 9){
            let val = relay + 4;
            socket.emit(`relay:${val}`);
            console.log(`Sent: ${val}`, " = " + relay + " + offset(4)");
        }
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.listen(port);
console.log('Server started at http://localhost:' + port);