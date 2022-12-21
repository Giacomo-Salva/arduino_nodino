const open_1 = document.getElementById("open_1");

function command(id) {
    let xhttp = new XMLHttpRequest();
    let val = parseInt(id.split("_").pop().toString());
    let prova_json = {
        relay : val
    };

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("alert_container").innerHTML = this.responseText;
            setTimeout(function () {document.getElementById("alert_container").innerHTML = "";}, 2000);
        }
    }

    xhttp.open("POST", "/comando", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(prova_json));
    console.log("sent" + JSON.stringify(prova_json))
}
open_1.addEventListener("click", function () {
    command(this.id)
});

console.log("ready");

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