var messages = [];
var demo="welcome to the demo page";
var socket = io.connect('http://localhost:3000');
/* socket.on("message",(data)=>{
    console.log(data);
    message=document.querySelector(".message");
    message.innerHTML=data.message;
}) */
socket.emit("test","this is the test message...");
