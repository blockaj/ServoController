var express = require("express");
var app = express();
var io = require("socket.io").listen(app.listen(80));
var sp = require("serialport").SerialPort; 
var serialPort = new sp("/dev/tty.usbmodem641", {baudrate: 9600});
var usersConnected = 0;
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
	response.sendfile("./views/index.html");
});

io.sockets.on("connection", function(socket){
	usersConnected = usersConnected + 1; 
	io.sockets.emit("newUser", {numberOfUsers : usersConnected});
	console.log("Users online: " + usersConnected);
	socket.on("disconnect", function(){
		usersConnected = usersConnected - 1;
		io.sockets.emit("disconnectedUser", {numberOfUsers : usersConnected});
		console.log("Users online: " + usersConnected);
	});
	socket.on("messageForServer", function(message){
		console.log(message.servoMessage);
	});
});