// defaults imports
const express = require("express");
const mongoose = require("mongoose");

// controller imports 
const { seditor }= require("../controllers/Scaler_controller/request_controller/Scaler.editor.controller");
const { ssignup} = require('../controllers/Scaler_controller/request_controller/ssignup.controller');
const { ssignin } = require("../controllers/Scaler_controller/request_controller/ssignin.controller");
const { getprojectdone } = require('../controllers/Scaler_controller/request_controller/scaler.projectcompleted.controller')

// configuration imports 
// const { jwtVerifier } = require("../config/jwtVerifier");
const { sjwtverfier } = require('../config/sjwtverifier')

// routes defination 
const sroutes= express.Router()

// Scaler routes 
sroutes.post('/signup',ssignup);
sroutes.post("/signin",ssignin);


//Scaler private routes 
sroutes.get("/editor",seditor)
sroutes.get("/projectdone",sjwtverfier,getprojectdone);
// exporting the modules
module.exports= {sroutes}
