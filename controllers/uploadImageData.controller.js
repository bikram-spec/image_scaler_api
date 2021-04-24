/* what is does */
    //this module will add the images to the folder uploads and add there path to the dataset collection.
    // Responds to the user with the images.
/* completed tasks */
    // The server stored image data is sended to the user succfully 
    // The route need to be private so add the jwt verifier to the index.route.for the this route.
/* risks to be work on */
    //1)--if(data_array.length==files.length)--  this will work if all the images are stored in the database
    //succfully so try to fix it.
    //2) global varibale are can be accessed using window keyword .
/* remaining tasks */
    //fix above (1) problem.


/* prebuilt import  */
const _ =require('loadsh');

/* user ndefined images dataset */
const { Dataset }=require('../models/Dataset.schema');
const { users } = require('../models/signup.schema');
const {projectDetails } = require('../models/projectDetail.schema');

/* Dataset function  */
module.exports.uploadImageDataset=(req,res,next)=>{
 let files=req.files;
 let data_array=[];
 console.log(req.body);
 if(!files)
 {
     console.log("the files is empty")
 }
 else 
 {
     console.log(files);
     users.findOne({_id:req._id},(err,user)=>{
         /* here and all over the project checks needed to be added for the user with error  */
         if(err || (!user)){
            if(err){
                res.send(err);
            } 
            else {
                res.send("session expired!!!");
            }
         }
         else 
         {
            /* adding data to the Dataset document */
            //data.belongsTo=req.body.Dataset;
            /* the save mehtod callback returns doc and err in the below order */

            /* The below method is send the whole data in one part */
            files.forEach(Object => {
                let data= new Dataset();
                data.filename=Object.filename;
                data.path=Object.path;
                data.originalname=Object.originalname;
                data.belongsTo=req.dataset_title;
                data.type=req.type;
                data.createdBy=user.email;
                data.Status="incomplete";
                data.save().then((doc,err)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        data_array.push(doc);
                        if(data_array.length==files.length)
                        {
                            res.json(data_array)
                        }
                    }
                })
            }); 

            /* The below method send the data in a multiple parts */
            /* files.forEach(Object => {
                let data= new Dataset();
                data.filename=Object.filename;
                data.path=Object.path;
                data.originalname=Object.originalname;
                //data.createdBy=user.email;
                data.save().then((doc,err)=>{
                    if(err){
                        console.log("The Error part is Executed")
                        conssole.log("The error msg is ",err);
                        res.send(err);
                    }
                    else{
                        console.log("the success part is executed ")
                        console.log("The success msg is ",doc);
                        res.write(JSON.stringify(doc));
                        data_array.push(doc);
                        if(data_array.length==files.length)
                        {
                            //res.json(data_array)
                            res.end();
                        }
                    }
                })
            }); */
            
         }
     })
    
 }
}