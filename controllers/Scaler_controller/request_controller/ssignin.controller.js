const passportconfig=require("../../../config/passportconfig");
const passport=require('passport');
//const { json } = require('body-parser');

module.exports.ssignin=(req,res,next)=>{
    passport.authenticate('admin',(err,user,msg)=>{
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