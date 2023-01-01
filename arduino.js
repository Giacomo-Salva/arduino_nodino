const five = require('johnny-five');
const temporal = require("temporal");
const express = require('express');
const app = express();

const server = app.listen(8181, function() {
    let port = 8181;
    console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

    console.log('New connection: ' + socket.id);

    // OPENAI version
    const board = new five.Board();

    board.on('ready', function() {
        const led = [];
        for (let i = 0; i <= 13; i++){ // all pins to 5v to prevent relay closing
            led[i] = new five.Led(i);
            led[i].on()
        }
        //closing relay functions
        socket.on(`relay`, function (i) {
            if (parseInt(i) >= 5 && parseInt(i) <= 12){
                console.log('message received from ' + socket.id + ': relay:' + i);
                led[i].off();
                temporal.delay(2000, function() {
                    led[i].on();
                    console.log(`relay:${i}` + 'aperto');
                });
                console.log(`relay:${i}` + 'chiuso\n');
                socket.emit('success');
            }
        });
    });
});
// Connect to the socket server
