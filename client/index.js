const open_1 = document.getElementById("open_1");

let xhttp = new XMLHttpRequest();
// Send a GET request to build the page
xhttp.open("GET", '/config', true);
xhttp.send();

xhttp.onreadystatechange = function() { //wait for a response
    if (this.readyState === 4 && this.status === 200) { //if response is valid, populate the webpage with the content
        let config_json = JSON.parse(this.responseText);
        console.log(config_json);
        let new_command = document.getElementById('commands_container').innerHTML;
        document.getElementById('commands_container').innerHTML = "";
        xhttp.open("GET", '/card', true);
        xhttp.send();

        xhttp.onreadystatechange = function (){
            if (this.readyState === 4 && this.status === 200){
                config_json.forEach(function (el){
                    console.log(el)
                    let card = this.responseText
                    card.replace("__command_name__", el.name)
                    card.replace("__command_icon__", el.icon)
                    card.replace("__command_relay_id__", el.relay)
                    card.replace("__command_relay_edit__", el.relay)
                    card.replace("__command_relay_delete__", el.relay)
                    document.getElementById('commands_container').insertAdjacentHTML('beforeend',card);
                });
                document.getElementById('commands_container').insertAdjacentHTML('beforeend', new_command);
            }

        }

        console.log("ready");

        function command(id) { //function called when command button is pressed and sends the relative command to the webserver
            let xhttp = new XMLHttpRequest();
            let val = parseInt(id.split("_").pop().toString()); //get the number part from the id of the button clicked
            let data_json = {
                relay : val
            };// create json with data to send

            xhttp.open("POST", "/command", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data_json));
            console.log("sent" + JSON.stringify(data_json))

            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById("alert_container").innerHTML = this.responseText;   // lets the user know if command was successfully sent
                    setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);
                }
            }
        }
        /*
        open_1.addEventListener("click", function () {
            command(this.id)
        });*/
    }
};

/*      GET request via AJAX -------------------------------------

        document.addEventListener('DOMContentLoaded', function() {
        // your code here
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
        document.getElementById("main_script").innerHTML = this.responseText;
    }
    };
        xhttp.open("GET", "/index.js", true);
        xhttp.send();
    }, false);
 */