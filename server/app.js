var http = require('http');
var express = require('express');
var app = express();
var CarController = require('./controller/CarController.js');
var InputMapper = require('./controller/InputMapper.js');
var controller = CarController.newDefaultController();
var mapper = new InputMapper(controller);

var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("server/public"));

server.listen(8080);

io.on('connection', function(socket){
    socket.on('keys', function(msg){
        mapper.processInput(msg);
    });
});

setInterval(function() {
    controller.tick();
    io.emit("telemetry", {
        state: "ok",
        data: controller.getTelemetry()
    })
}, 100);