const open_1 = document.getElementById("open_1");

function command() {
    let xhttp = new XMLHttpRequest();
    let prova_json = {
        relay : 1
    };
    xhttp.open("POST", "/comando", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(prova_json);
    console.log("sent" + JSON.stringify(prova_json), prova_json)
}
open_1.addEventListener("click", command);
console.log("ready")