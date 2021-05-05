// defaults import 
const { Dataset }= require("../../../models/Dataset.schema");
const { projectDetails } = require("../../../models/projectDetail.schema");
// main function
module.exports.seditor=(req,res,next)=>{

    // send the image name to the client so he can use it for getting access to the 
    Dataset.findOne({"Status":"incomplete"},(err,doc)=>{
        if(err || !doc)
        {
            //res.send("There is no data write now to scale...");
            res.json({"success":"There is no data write now"})
        }
        else 
        {
            // console.log(doc.belongsTo);
            projectDetails.findOne({"Dataset_title":doc.belongsTo},(err,data)=>{
                if(err || !data)
                {
                    res.send("invalid operation you are trying to perform ")
                }
                else 
                {
                    // console.log(doc.filename);
                    var dataobj=data.toObject();
                    dataobj.filename=doc.filename;
                    doc.Status="inprogress";
                    doc.save().then((doc,err)=>{
                        if(err || !doc)
                        {
                            res.send("internal server error occured ....");
                            // console.log("The Server is failed to update the document status...");
                        }
                        else
                        {

                            res.send(dataobj);
                            // console.log("update to the doument is also succfully...");
                            // console.log(dataobj);
                        }
                    })
                }
            })
        }
    })
}