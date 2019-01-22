var mqtt = require('mqtt');
var fs = require("fs");
var client = mqtt.connect("mqtt:127.0.0.1", {
    clientId: "DispositivoJM",
    will:{
        topic: "testamento",
        payload: "Dispositivo JM 381 saiu fora",
        qos: 0
    }
})

client.on("connect", function(){
    console.log("Conexão: " + client.connected);
    client.subscribe("jm", function(err){
        if(!err){
            client.publish("jm", "Hello baby");
        }
    })
})

client.on("error", function(error){
    console.log("Erro: " + error);
    proccess.exit(1);
})

client.on("message", function(topic, msg){
    console.log(msg.toString());
    fs.appendFileSync("message.txt", topic + ";" + msg + "\r\n")
})

setInterval(() => {
    client.publish("jm", "Olá, estou no jogo ! " + new Date().toLocaleString());
}, 1000)

