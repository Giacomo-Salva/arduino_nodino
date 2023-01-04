let open_info = '<div style="margin: auto; width: 100%" class="alert alert-info" role="alert">Invio comando in corso...</div>'
function openCommand(id) { //function called when command button is pressed and sends the relative command to the webserver
    let xhrFun = new XMLHttpRequest();
    if(id.split("_")[0] === "open"){
        let data_json = {
            action : "open",
            relay : parseInt(id.split("_").pop().toString()) //get the number part from the id of the button clicked
        };// create json with data to send

        xhrFun.open("POST", "/command", true);
        xhrFun.setRequestHeader("Content-type", "application/json");
        xhrFun.send(JSON.stringify(data_json));
        console.log("sent" + JSON.stringify(data_json))
        document.getElementById("alert_container").innerHTML = open_info;   // lets the user know if command was successfully sent
        setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);

        xhrFun.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText)
                document.getElementById("alert_container").innerHTML = this.responseText;   // lets the user know if command was successfully executed (or if error occurred)
                setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);
            }
        }
    }
}
function editCommand(id) { //function called when command button is pressed and sends the relative command to the webserver
    let xhrFun = new XMLHttpRequest();
    if(id.split("_")[0] === "edit"){
        let data_json = {
            action : "edit",
            relay : parseInt(id.split("_").pop().toString()) //get the number part from the id of the button clicked
        };// create json with data to send

        xhrFun.open("POST", "/command", true);
        xhrFun.setRequestHeader("Content-type", "application/json");
        xhrFun.send(JSON.stringify(data_json));
        console.log("sent" + JSON.stringify(data_json))

        xhrFun.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("alert_container").innerHTML = this.responseText;   // lets the user know if command was successfully sent
                setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);
            }
        }
    }
}
function deleteCommand(id) { //function called when command button is pressed and sends the relative command to the webserver
    let xhrFun = new XMLHttpRequest();
    if(id.split("_")[0] === "delete"){
        let data_json = {
            action : "delete",
            relay : parseInt(id.split("_").pop().toString()) //get the number part from the id of the button clicked
        };// create json with data to send

        xhrFun.open("POST", "/command", true);
        xhrFun.setRequestHeader("Content-type", "application/json");
        xhrFun.send(JSON.stringify(data_json));
        console.log("sent" + JSON.stringify(data_json))

        xhrFun.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("alert_container").innerHTML = this.responseText;   // lets the user know if command was successfully sent
                setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);
            }
        }
    }
}


let dev = [];
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

        xhttp.open("GET", '/card', true); // to get template
        xhttp.send();
        xhttp.onreadystatechange = function (){
            if (this.readyState === 4 && this.status === 200){
                let card_template = this.responseText
                config_json.forEach(function (el){
                    let card = card_template
                    card = card.replace("__command_name__", el.name)
                    card = card.replace("__command_icon__", "/assets/icons?icon=" + el.icon)
                    card = card.replace("__command_relay_id__", "open_" + el.relay)
                    card = card.replace("__command_relay_edit__", "edit_" + el.relay)
                    card = card.replace("__command_relay_delete__", "delete_" + el.relay)
                    document.getElementById('commands_container').insertAdjacentHTML('beforeend',card);
                    dev[el.id] = [document.getElementById("open_" + el.relay), document.getElementById("edit_" + el.relay),document.getElementById("delete_" + el.relay)];
                });
                document.getElementById('commands_container').insertAdjacentHTML('beforeend', new_command);

                dev.forEach(function (el){
                    el[0].addEventListener("click", function (){ openCommand(this.id) })
                    el[1].addEventListener("click", function (){ editCommand(this.id) })
                    el[2].addEventListener("click", function (){ deleteCommand(this.id) })
                })
                console.log("ready");



            }

        }
    }
};

/*

 */


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