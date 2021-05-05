const jwt=require('jsonwebtoken');
const { scaler } = require("../models/Scaler_models/Scale.schema")

module.exports.sjwtverfier=(req,res,next)=>{
    if("sauthorization" in req.headers){
        var token=req.headers["sauthorization"].split(' ')[1];
    }
    else 
    {
        // console.log(req.params['token']);
        if(req.params['token'])
        {
            var token=req.params['token'];
        }
    }
    if(token){
        jwt.verify(token,process.env.jwt_Scret,(err,decode)=>{
            if(err){
                res.status(403).send("invaild json web token\n");
            }
            else {
                // console.log("The request reaaches Jwtverifier...")
                // console.log("The invalid id is ",decode['_id']);
                scaler.findOne({_id:decode['_id']},(err,user)=>{
                    if(err || (!user)){
                        res.send("The jwt token is corrupted");
                    }
                    else {
                        //console.log("The request pass the jwtverifier...");
                        req.email=user.email;
                        req._id=decode["_id"];
                        next();
                    }
                })
/*                 req._id=decode["_id"];
                console.log("this is the id"+decode["_id"]);
                next();  */
                
            }
        })
    }
    else 
    {
        res.send("you are not authprised to do so...");
    }
}