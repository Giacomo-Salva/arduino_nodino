const five = require('johnny-five');
const temporal = require("temporal");
const express = require('express');
const app = express();

const led = [];

const server = app.listen(8181, function() {
    let port = 8181;
    console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);
const board = new five.Board();
board.on('ready', function() { // board initialization
    for (let i = 0; i <= 13; i++) { // all pins to 5v to prevent relay closing
        led[i] = new five.Led(i);
        led[i].on()
    }
});
/*
    board.on('disconnect', function (){
        board = new five.Board()
    });
     */

board.on('error', function(err) { //if board throws errors, show them on console
    console.log('ERROR FROM BOARD: ' + err);
});

io.of('/arduino').on('connection', (socket) => { //on connection with webserver.js
    console.log('New connection: ' + socket.id);
    async function keepalive (){ // keep the connection alive using a message every 10 seconds
        socket.emit('keepalive_msg')
        setTimeout(keepalive,10000)
    } keepalive();

    socket.on(`relay`, function (i) { //on 'relay' in socket, close the relay [i]
        if (parseInt(i) >= 5 && parseInt(i) <= 12){ //check for right relay number
            console.log('message received from ' + socket.id + ': relay:' + i + "\n");
            led[i].off(); //close the relay by giving 0V
            temporal.delay(2000, function() { //wait 2 seconds
                led[i].on();                    //open the relay giving 5V back
                console.log(`relay:${i}` + 'aperto\n---\n');
            });
            console.log(`relay:${i}` + 'chiuso\n');
            socket.emit('success'); //let webserver.js know about the success
        }
    });
});


