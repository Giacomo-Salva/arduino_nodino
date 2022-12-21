const five = require('johnny-five');
const temporal = require("temporal");
const express = require('express');
const app = express();

const server = app.listen(8080, function() {
    let port = 8080;
    console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

    console.log('New connection: ' + socket.id);
    socket.on('relay', (val) => {
        console.log('message received from ' + socket.id + ': relay:' + val);
    });
    // OPENAI version
    const board = new five.Board();

    board.on('ready', function() {
        const led = [];
        for (let i = 0; i <= 13; i++){ // all pins to 5v to prevent relay closing
            led[i] = new five.Led(i);
            led[i].on()
        }
        //closing relay functions
        for (let i = 5; i <= 12; i++) {
            socket.on(`relay`, function (i) {
                led[i].off();
                temporal.delay(2000, function() {
                    led[i].on();
                    console.log(`relay:${i}` + 'aperto');
                });
                console.log(`relay:${i}` + 'chiuso\n');
            });
        }
    });
});
// Connect to the socket server
