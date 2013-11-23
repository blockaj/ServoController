var socket = io.connect();


socket.on("newUser", function(numberOfUsersOn){
	$("#usersOnline").text(numberOfUsersOn.numberOfUsers);
});

socket.on("disconnectedUser", function(numberOfUsersOn){
	$("#usersOnline").text(numberOfUsersOn.numberOfUsers);
});

$(document).ready(function(){
	$("#error").hide();
});
function sendToServer()
{
	if (isNaN($("#servoField").val()))
	{
		$("#error").text("Error: not a number.");
		$("#error").show();
	}
	else
	{
		socket.emit("messageForServer", {servoMessage: $("#servoField").val()});
		$("#error").hide();
	}
	$("#servoField").val("");
}

function getKeyCode()
{
	if (event.keyCode == 13)
	{
		sendToServer();
	}
}