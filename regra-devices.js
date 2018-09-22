require('mraa');
var groveSensor = require('jsupm_grove');
var requestify = require('requestify'); 
var upmBuzzer = require("jsupm_buzzer");
// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);
var button = new groveSensor.GroveButton(2);
var temp = new groveSensor.GroveTemp(0);
var lum = new groveSensor.GroveLight(1);
var myBuzzer = new upmBuzzer.Buzzer(5);

var count = 0, death = 500000;

var thing = "DM120_CN"

readData();
//simpleb.readSensorValue();
//touch.readButtonValue();

function readData() {
      var celsius = temp.value();
      console.log("Temperatura em Celsius " + celsius);
      var luminosidade = lum.value();
      console.log("Luminosidade é: " + luminosidade);

      if(celsius>20 && luminosidade >60){
        melody();
        var url = "https://dweet.io:443/dweet/for/" + thing

        // Envia dados para servidor via método POST    
        requestify.post(url, {
            temperatura: celsius,
            luminosidade: luminosidade,
            buzzer:1,
            mensagem:"Temperatura e luminosidade altas."
        })
        .then(function(response) {
    
            // Obtem resposta do servidor
            response.getBody();        
    
            console.log(response.body)
        });
      }else{
        stopMelody();
      }

    /*  var url = "https://dweet.io:443/dweet/for/" + thing


    // Envia dados para servidor via método POST    
    requestify.post(url, {
        temperatura: celsius,
        luminosidade: luminosidade,
        buzzer:1,
        mensagem:"Temperatura e luminosidade altas."
    })
    .then(function(response) {

        // Obtem resposta do servidor
        response.getBody();        

        console.log(response.body)
    });*/
      //Chama a função a cada 1 segundo 
      setTimeout(readData, 1000);
}
     
function melody() {
    
    //Play sound for one half second
    console.log(myBuzzer.playSound(1000, death));
    count++;
    if (count >= 5 && count <= 10) {
        death = 0;
    } else {
        death = 500000;
    }


}
function stopMelody(){
    myBuzzer.stopSound();
}
//setInterval(melody, 1000);
     
      

