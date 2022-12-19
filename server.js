const express = require('express');
const app = express();

const server = app.listen(8080, function() {
    let port = 8080;
    console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

    console.log('New connection: ' + socket.id);
    // OPENAI version
    for (let i = 5; i <= 12; i++) {
        socket.on(`relay:${i}`, function (){
            socket.broadcast.emit(`relay:${i}`);
            console.log(`Broadcasting: relay:${i}`);
        });
    }
});