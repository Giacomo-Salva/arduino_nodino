const io = require('socket.io-client');
const five = require('johnny-five');
const temporal = require("temporal");

// Connect to the socket server
const socket = io.connect('http://localhost:8080/arduino');

const board = new five.Board();

board.on('ready', function() {
    const led = [];
    for (let i = 0; i <= 13; i++){ // all pins to 5v to prevent relay closing
        led[i] = new five.Led(i);
        led[i].on()
    }



    /* OG j-five code
    socket.on('led:on', function(){
        led.on();
    });
     */

    //closing relay functions
    for (let i = 5; i <= 12; i++) {
        socket.on(`relay:${i}`, function () {
            console.log('pre comando relay');
            led[i].off();
            console.log('post comando relay');

            /*setTimeout(function () {
                led[i].on();
                console.log('post nel timeout comando relay');
            }, 10000);*/
            temporal.delay(5000, function() {
                led[i].on();
                console.log('post nel timeout comando relay');
            });
            console.log('post 2 comando relay');

        });
    }

});