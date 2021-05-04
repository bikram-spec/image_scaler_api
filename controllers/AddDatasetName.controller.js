/* all the prebuilt moduules import  */
const _ =require('loadsh');
const fs = require('fs');

/* user defined modules import  */
const {projectDetails} = require('../models/projectDetail.schema');
const { Dataset }= require('../models/Dataset.schema')
const  { users} = require('../models/signup.schema');

/* main export class */
module.exports.AddDatasetName=(req,res,next)=>{
    let detail=new projectDetails();
    detail.Dataset_title=req.body.title;
    detail.Instruction=req.body.Instruction;
    detail.Date_of_creaction=Date.now();
    detail.Dataset_type =req.body.type;
    detail.ObjectsToAnnotate= req.body.objects;
    users.findOne({_id:req._id},(err,user)=>{
        if(err || (!user))
        {
            res.send(err)
        }
        else
        {
            //console.log(user.email);
            detail.CreatedBy=user.email;
            detail.save().then((err,doc)=>{
                if(!err){
                    res.send(doc);
                }
                else {
                    res.send(err);
                }
            })
            /* add referance to the user document  */
            /* a bug is there the referance is added when there is validation error i.e when it has incomplete data */
            user.Dataset_details.push(detail);
            user.save();
        }
    })
}

/* update dataset */
module.exports.updateDataset=(req,res,next)=>{
    projectDetails.findOne({Dataset_title:req.body.title},(err,doc)=>{
        if(err || (!doc))
        {
            res.status(404).json({msg:"Failed to update the document"});
        }
        else 
        {
            doc.ObjectsToAnnotate=req.body.objects;
            doc.Instruction=req.body.Instruction;
            doc.save().then(
                (status,err)=>{
                    if(err || (!status)){
                        res.status(500).json({error:"The internal sever Occured..."})
                    }
                    else 
                    {
                        res.status(200).json({msg:"The document updated succfully..."});
                    }
                }
            )
        }
    })
}
/* update dataset ends here */

/* Delete Dataset */
module.exports.deleteDataset=(req,res,next)=>{

    Dataset.find({"belongsTo":req.body.title},(err,files)=>{
        if(err || (!files) )
        {
            // res.status(204).json({msg:"There is no data available..."})
            console.log("there is no data available...")
        }
        else
        {
            /* Deleting from database */
            Dataset.deleteMany({"belongsTo":req.body.title},(err)=>{
                if(err)
                {
                    // res.status(500).json({errror:"Failed To delete Dataset Data..."})
                    console.log("failed to delete the data from the server")
                }
                else
                {
                    // res.status(200).json({msg:"The Dataset Data is deleted succfully..."});
                    console.log("The Data is deleted form the server...");
                }
            })
            /* deliting from database completes here */
            /* deleting from file system  */
                files.forEach((file)=>{
                    fs.unlink(`${process.env.root_dir}/${file.path}`,(err)=>{
                        if(err)
                        {
                            // res.status(500).json({error:"Failed to delete the file from the server"});
                            console.log("we are failed to delete the file from server..")
                        }
                    })
                })
            /* deleting from file systeem end */

        }
    })

    /* deleting project */
    projectDetails.deleteOne({Dataset_title:req.body.title},(err)=>{
        if(err)
        {
            res.status(500).json({error:"The Dataset is Failed To Delete"})
        }
        else 
        {
            res.status(200).json({msg:"The Dataset Deleted Succfully.."})
        }
    })

}
/*  */

/* get project details method */

module.exports.getprojectdetails=(req,res,next)=>{
    projectDetails.find({'CreatedBy':req.email},'Dataset_title Instruction Date_of_creaction Dataset_type ObjectsToAnnotate -_id',(err,projects)=>{
        if(err){
            res.send("There is an error ocured while processing your application");
        }
        else {
            if(!projects)
            {
                console.log("There is no project with your name");
                res.json({});
            }
            else {
                console.log(projects);
                res.send(projects);
            }
        }
    })

    //query=projectDetails.find({'CreatedBy':req.email}).select({"Dataset_title":1,"Instruction":1,"Date_of_creaction":1,"Dataset_type":1,})
}
