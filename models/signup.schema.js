const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const SignupSchema=new mongoose.Schema({
    company_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    saltScret:String,
    Dataset_details : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'projectDetails'
    }]
})

/* SignupSchema.pre('save',function(next) {
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(this.password,salt,function(err,hash){
            console.log(this.password);
            this.password=hash;
            this.saltScret=salt;
            next();
        });
    });
});
 */

SignupSchema.methods.verifyuser=function(password){
    console.log(password);
    return bcrypt.compareSync(password,this.password)
}

SignupSchema.methods.generatejwt=function(){
    return jwt.sign({_id:this._id},process.env.jwt_Scret,{expiresIn:process.env.jwt_expirection});
}

const users = mongoose.model('users',SignupSchema);


module.exports={users};
