// defaults imports
const express = require("express");
const mongoose = require("mongoose");

// configuration imports 
const { jwtVerifier } = require("../config/jwtVerifier");

// view controller imports 
const { index,test,editor,demo,ccchart } = require("../controllers/Scaler_controller/view_controller/index.controller");

module.exports = function(io){

    const eroutes= express.Router();

    // Client routes 
    eroutes.get("/cchart",ccchart)


    // Scaler Routes 
    eroutes.get("/",index);
    eroutes.get("/test/demo",test);
    eroutes.get("/editor",editor);
    eroutes.get("/demo",demo)

    // returning the routes ...;
    return eroutes;
}
