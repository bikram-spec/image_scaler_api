const {users} =require('../models/signup.schema');
const bcrypt=require('bcrypt');
//const ObjectId=require('mongoose').Types.ObjectId;

module.exports.signup= (req,res,next)=> {
    let user=new users();
    user.company_name=req.body.company_name;
    user.email=req.body.email;
    user.password=req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            user.saltScret=salt;
            user.save().then((doc,err)=>{
                if(!err){
                    console.log(doc);
                    res.json({token:user.generatejwt()})
                }
                else{
                    console.log("Error :-"+err);
                    res.send(err);
                }
            });
        });
    });   
}