
var upmBuzzer = require("jsupm_buzzer");
var requestify = require('requestify');
// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);
var thing = "DM120_CN"
var dataBuzzer=[];

// Print sensor name
console.log(myBuzzer.name());

function getData(){
    var url = "https://dweet.io:443/get/latest/dweet/for/" + thing
    requestify.get(url)
    .then(function(response) {

        // Obtem resposta do servidor
        response.getBody();      

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
        console.log( myBuzzer.playSound(10000, 500000) );
       
      
}
//setInterval(melody, 100);
setInterval(getData,1000);
// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});