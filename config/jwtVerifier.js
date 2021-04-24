const { authorize } = require("passport")
const jwt= require('jsonwebtoken');
const { users }= require('../models/signup.schema');
const { projectDetails } = require('../models/projectDetail.schema')

module.exports.jwtVerifier=(req,res,next)=>{
    if("authorization" in req.headers){
        var token=req.headers["authorization"].split(' ')[1];
    }
    else 
    {
        // console.log(req.params['token']);
        if(req.params['token'])
        {
            var token=req.params['token'];
        }
    }
    console.log("The request enter in jwt verifier ...")
    if(token){
        // token=req.headers["authorization"].split(' ')[1];
        // console.log(req.headers["authorization"]);
        jwt.verify(token,process.env.jwt_Scret,(err,decode)=>{
            if(err){
                res.status(403).send("invaild json web token\n");
            }
            else {
                console.log("The request reaaches Jwtverifier...")
                // console.log("The invalid id is ",decode['_id']);
                users.findOne({_id:decode['_id']},(err,user)=>{
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

module.exports.Dataset_helper=(req,res,next)=>{
    console.log("The request reaches the Dataset_helper method...")
    if("dataset_name" in req.headers){
        console.log("The request passess the jwtverifier method...");
        //console.log("The request conintain valid project name...");
        dataset_title=req.headers["dataset_name"];
        //console.log(dataset_title);
        req.dataset_title=dataset_title;
        projectDetails.findOne({"Dataset_title":dataset_title},(err,doc)=>{
            if(err || !doc)
            {
                res.send("invaild project name...")
            }
            else 
            {
                req.type=doc.Dataset_type;
                next();
            }
        })
    }
    else 
    {
        //console.log("the request contain the invalid project name..");
        res.send("invalid project name received...")
        //console.log(req.headers);
    }
}