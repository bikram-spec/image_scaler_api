//const {server} = require('../index');
// const socket=require("socket.io");
// const io=socket(server);
module.exports.test=(req,res,next)=>{
    res.send("welcome to the testing site");
    //Whenever someone connects this gets executed
}