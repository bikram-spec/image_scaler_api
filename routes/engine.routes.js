// defaults imports
const express = require("express");
const mongoose = require("mongoose");

// configuration imports 
const { jwtVerifier } = require("../config/jwtVerifier");

// scaler view jwt verfier import
const { sjwtverfier } = require('../config/sjwtverifier')

// view controller imports 
const { index,test,editor,demo,ccchart,ceditor } = require("../controllers/Scaler_controller/view_controller/index.controller");
const { getchart }= require('../controllers/Scaler_controller/view_controller/getchart.controller')

module.exports = function(io){

    const eroutes= express.Router();

    // Client routes 
    // This route is used to display the chart
    eroutes.get("/cchart/:token",jwtVerifier,getchart,ccchart);


    // scaler route
    // This route is used to display the image annotation editor
    eroutes.get("/editor/:token",sjwtverfier,editor);
    // this route is used to disply the image classfication editor
    eroutes.get("/ceditor/:token",sjwtverfier,ceditor);


    // testing routes
    eroutes.get("/",index);
    eroutes.get("/test/demo",test);
    eroutes.get("/demo",demo);

    // returning the routes ...;
    return eroutes;
}
