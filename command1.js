const { Board, Led, Relay} = require("johnny-five");
const board = new Board();
const relay = [];
board.on("ready", () => {
    for (let i=0; i<13; i++){
        relay[i] = new Relay(i,"NC");
        relay[i].open();
    }
    const led = new Led(13);
    led.on();
});

const express = require("express");
const app = express();

app.get('/', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/command.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
    // Capture the input fields
    let pin = request.body.relay;
    if (0<pin && pin<13){
        relay[pin].close();
        setTimeout(1000);
        relay[pin].open();
    }

});