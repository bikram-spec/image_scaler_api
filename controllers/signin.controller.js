const passportconfig=require("../config/passportconfig");
const passport=require('passport');
//const { json } = require('body-parser');

module.exports.signin=(req,res,next)=>{
    passport.authenticate('local',(err,user,msg)=>{
        if(err){
            res.send(err);
        }
        else if(!user){
            res.json(msg)
        }
        else {
            //res.send("welcome to the internet world with token");
            res.json({token:user.generatejwt()});
        }
    })(req,res,next);
}