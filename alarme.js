
require('mraa');
var groveSensor = require('jsupm_grove');
var requestify = require('requestify');
var upmBuzzer = require("jsupm_buzzer")
var sensorModule = require('jsupm_ttp223'); 

// Create the TTP223 touch sensor object using GPIO pin 0
var touch = new sensorModule.TTP223(2);
// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);
var temp = new groveSensor.GroveTemp(0);
var lum = new groveSensor.GroveLight(1);
var dataBuzzer=[];

var thing = "DM120_CN";
var thing2="DM120_CN_Buzzer"
var thingT = "DM120_CN-Touch"

readData();
getData();
readSensorValue();
//simpleb.readSensorValue();
//touch.readButtonValue();

//TEMPERATURA E LUMINOSIDADE
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

//BUZZER
function getData(){
    var url = "https://dweet.io:443/get/latest/dweet/for/" + thing2
    requestify.get(url)
    .then(function(response) {

        // Obtem resposta do servidor
        response.getBody();      
        console.log("teste")
        console.log(response.getBody().with[0].content.buzzer)
        
        if(response.getBody().with[0].content.buzzer===1){
            melody();
        }else{
            console.log("Parei");
        }
    });
}
function melody()
{
        //Play sound for one half second
        console.log( myBuzzer.playSound(1000, 500000) );
       
      
}
//setInterval(melody, 100);
setInterval(getData,5000);
// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});


function readSensorValue() {
    if ( touch.isPressed() ) {
        console.log(touch.name() + " is pressed");
    } else {
        console.log(touch.name() + " is not pressed");
    }
    var url = "https://dweet.io:443/dweet/for/DM120_CN_Touch"

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
setInterval(readSensorValue, 5000);

