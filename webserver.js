const express = require('express');
const path = require('path');
const io = require("socket.io-client");
const app = express();
const port = 8081;
const bodyParser = require("body-parser");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/comando', (req, res) => {
    const relay = req.body.relay;
    const socket = io.connect('http://localhost:8080/arduino');
    if(relay > 0 && relay < 9){
        let val = parseInt(relay) + 4;
        socket.emit(`relay:${val}`);
        console.log(`Sent: ${val}`);
        console.log(req.body)
    }
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);