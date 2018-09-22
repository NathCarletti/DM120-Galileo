require('mraa');
var groveSensor = require('jsupm_grove');
var requestify = require('requestify');
// Initialize on GPIO 5
var button = new groveSensor.GroveButton(2);
var thing = "DM120_CN"

function readButtonValue() {

    console.log(button.name() + " value is " + button.value());

    var url = "https://dweet.io:443/dweet/for/" + thing

    // Envia dados para servidor via método POST    
    requestify.post(url, {
        BotaoSimples: button.value()
    })
        .then(function (response) {

            // Obtem resposta do servidor
            response.getBody();

            console.log(response.body)
        });

}

setInterval(readButtonValue, 1000);

