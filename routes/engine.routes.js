// defaults imports
const express = require("express");
const mongoose = require("mongoose");

// configuration imports 
const { jwtVerifier } = require("../config/jwtVerifier");

// scaler view jwt verfier import
const { sjwtverfier } = require('../config/sjwtverifier')

// view controller imports 
const { index,test,editor,demo,ccchart } = require("../controllers/Scaler_controller/view_controller/index.controller");

module.exports = function(io){

    const eroutes= express.Router();

    // Client routes 
    eroutes.get("/cchart",ccchart)


    // Scaler Routes 
    eroutes.get("/",index);
    eroutes.get("/test/demo",test);
    eroutes.get("/editor/:token",sjwtverfier,editor);
    eroutes.get("/demo",demo)

    // returning the routes ...;
    return eroutes;
}
