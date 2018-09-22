require('mraa');
var groveSensor = require('jsupm_grove');
var requestify = require('requestify');

var temp = new groveSensor.GroveTemp(0);
var lum = new groveSensor.GroveLight(1);

var thing = "DM120_CN"

readData();
//simpleb.readSensorValue();
//touch.readButtonValue();

function readData() {
    var celsius = temp.value();
    console.log("Temperatura em Celsius " + celsius);
    var luminosidade = lum.value();
    console.log("Luminosidade é: " + luminosidade);

    var url = "https://dweet.io:443/dweet/for/" + thing

    // Envia dados para servidor via método POST    
    requestify.post(url, {
        temperatura: celsius,
        luminosidade: luminosidade
    })
        .then(function (response) {

            // Obtem resposta do servidor
            response.getBody();

            console.log(response.body)
        });
    //Chama a função a cada 1 segundo 
    setTimeout(readData, 1000);
}




