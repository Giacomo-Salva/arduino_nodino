var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    // Create an Led on pin 13
    const led = new Led(13);
    // Blink every half second
    led.blink(500);
});