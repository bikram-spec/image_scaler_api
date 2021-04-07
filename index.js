//import for the pre-defined modules 
const express = require('express');
const ejs= require("ejs");
const http= require('http');
const socket= require('socket.io')
const mongoose= require('mongoose');
const body_parser=require('body-parser');
const jwt =require('jsonwebtoken');
const cors=require('cors');
const path=require("path");
const passport=require('passport')
const localStrtegy=require('passport-local');
const logger=require('morgan');
const multer= require('multer')

// imports for the created modules
const config=require('./config/config');
const connect=require('./models/connect');


// router imports 
const { router } = require('./routes/index.router');
// const { eroutes } = require("./routes/engine.routes");
const { sroutes } = require('./routes/scaler.routes');



// constant decalaration  
const app=express();
const server=http.Server(app);
const io=socket(server);

// router socket
require("./routes/socket.handler")(io);

// view engine setup
//if there you add any space after engine then the application will fail to load
app.set("view engine","ejs"); 
app.set("views",path.join(__dirname,"views"));


// setting up public folder
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

// new to try
// const public_dir=path.join(__dirname,"/public/")
// app.use(express.static(public_dir));

// middle ware for the express
app.use(cors())
app.use(logger())
app.use(body_parser.json())
app.use(passport.initialize())

// self io middleware creater
app.use((req,res,next)=>{
    req.io=io;
    next();
})

//Routes of the api
app.use('/api',router);
app.use("/scaler",sroutes);
app.use("/engine",require("./routes/engine.routes")(io));// special case to use io inside routes we nedd to do this ..;


//server listening ports 
server.listen(process.env.port,()=>{
    console.log("the server is listening on the port "+process.env.port);
})
// io.sockets.on('connection', function (socket) {
//     socket.emit('message', { message: 'welcome to the chat' });
//     socket.on('send', function (data) {
//         io.sockets.emit('message', data);
//     });
//     console.log("welcome to the ninja street...");
// });

