import io from 'socket.io-client';

(function() {
        const submit = this.document.getElementById('submit');
        const relay = this.document.getElementById('relay');
        const toggle = () => {
            // Emit the event led:on/off when the switch is clicked9
            if(relay.value > 0 && relay.value < 9){
                socket.emit(`relay:${relay.value}`);
                console.log(`Sent: ${relay.value}`);
            }
        };

        // Connect to the socket server
        const socket = io.connect('http://localhost:8080/arduino'); //  http://localhost:8080/arduino

        // Add an event listener (click) to the switch to turn the relay on/off
        submit.addEventListener('click', toggle);
    }

)();
