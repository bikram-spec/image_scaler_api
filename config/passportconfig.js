const passport =require('passport');
const mongoose=require('mongoose');
const LocalStategy =require('passport-local').Strategy;
const { scaler } = require("../models/Scaler_models/Scale.schema");
const { users } =require('../models/signup.schema');


passport.use('local' ,new LocalStategy({usernameField:'email'},
    function(username,password,done){
        console.log(username,password);
        users.findOne({email:username},(err,user)=>{
            if(err){
                return done(err);
            }
            else if(!user){
                return done(null,false,{message:"User Does not exist "});
            }
            else if(!user.verifyuser(password)){
                //console.log(password);
                return done(null,false,{message:"Wrong password"});
            }
            else {
                return done(null,user);
            }
        });
    }

));

passport.use('admin' ,new LocalStategy({usernameField:'email'},
    function(username,password,done){
        console.log(username,password);
        scaler.findOne({email:username},(err,user)=>{
            if(err){
                return done(err);
            }
            else if(!user){
                return done(null,false,{message:"User Does not exist "});
            }
            else if(!user.verifyuser(password)){
                //console.log(password);
                return done(null,false,{message:"Wrong password"});
            }
            else {
                return done(null,user);
            }
        });
    }

));