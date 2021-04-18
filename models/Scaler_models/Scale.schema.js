// defaults requirs ..
const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const scaler_schema= new mongoose.Schema(
    {
        company_name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        task_completed: {
            type:Number
        },
        password:{
            type:String,
            required:true,
            minlength:8
        },
        saltScret:String
    }
)

scaler_schema.methods.verifyuser=function(password){
    return bcrypt.compareSync(password,this.password)
}

scaler_schema.methods.generatejwt=function(){
    return jwt.sign({_id:this._id},process.env.jwt_Scret,{expiresIn:process.env.jwt_expirection});
}


const scaler = mongoose.model("scaler",scaler_schema);

module.exports = {scaler}