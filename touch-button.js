
var sensorModule = require('jsupm_ttp223');
var requestify = require('requestify'); 

// Create the TTP223 touch sensor object using GPIO pin 0
var touch = new sensorModule.TTP223(3);
var thing = "DM120_CN"

// Check whether or not a finger is near the touch sensor and
// print accordingly, waiting one second between readings
function readSensorValue() {
    if ( touch.isPressed() ) {
        console.log(touch.name() + " is pressed");
    } else {
        console.log(touch.name() + " is not pressed");
    }
    var url = "https://dweet.io:443/dweet/for/" + thing

    // Envia dados para servidor via método POST    
    requestify.post(url, {
        BotaoTouch: touch.isPressed()
    })
        .then(function (response) {

            // Obtem resposta do servidor
            response.getBody();

            console.log(response.body)
        });

}
setInterval(readSensorValue, 1000);