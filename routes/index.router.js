//prebuild module imports
const express= require('express');
const mongooose=require('mongoose');
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const _ =require('loadsh');

/* config import  */
const { jwtVerifier,Dataset_helper }= require('../config/jwtVerifier');
const { upload }= require('../config/multer.config');
const { dataset_directory_checker }= require('../config/file.config');

//Controller importts
const { signup } = require('../controllers/signup.controller');
const { signin }= require('../controllers/signin.controller');
const { userProfile } = require('../controllers/userProfile.controller');
const { AddDatasetName}= require('../controllers/AddDatasetName.controller');
const { uploadImageDataset } =require('../controllers/uploadImageData.controller');
const { getprojectdetails }= require('../controllers/AddDatasetName.controller');
const { getImageData,getScaledImageData }= require('../controllers/getImageData.controller')


//  demo testing controller
const { test }= require('../controllers/test_methods.controller');
const { projectDetails } = require('../models/projectDetail.schema');

/* global variable delecraction */
// var upload = multer({ dest: 'uploads/' })

const router= express.Router()
/* public routes  */
    //Signup Route post request
    router.post('/signup',signup);

    //Signin route Post request
    router.post('/signin',signin);

    // methods testing request handler
    router.get("/test",test);     


    
/* private routes */
    //user profile router get request
    router.get('/userProfile',jwtVerifier,userProfile);

    /* get project details route */
    router.get('/projectdetails',jwtVerifier,getprojectdetails);

    /* add Dataset name route  */
    router.post('/addDatasetName',jwtVerifier,AddDatasetName);
    

    /* upload dataset for single  image  */
    //router.post('/uploadDataset',upload.single('file'),uploadImageDataset)

    /* upload Dataset with Multiple Images  */
    router.post('/uploadDatasets',jwtVerifier,Dataset_helper,dataset_directory_checker,upload.array('files',5),uploadImageDataset)

    /* Get images Data from the express server.. */
    router.get('/getdata',jwtVerifier,Dataset_helper,getImageData)
    /* This is a serious vulnerability that needs to be get fixed you need to add jwtverifier to the path */
    router.get('/getdata/:imageName',getImageData)

    // this the is the route to get the scalde images in the 
    router.get('/getScaleddata',jwtVerifier,Dataset_helper,getScaledImageData);


module.exports= {router};