/* all the prebuilt moduules import  */
const _ =require('loadsh');

/* user defined modules import  */
const {projectDetails} = require('../models/projectDetail.schema');
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
                res.status(200).json({success:"the document updated succfully..."})
            )
        }
    })
}
/* update dataset ends here */

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
