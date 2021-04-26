// some default imports
const {Dataset}=require('../models/Dataset.schema')

module.exports.getImageData=async (req,res,next)=>{
    console.log("The request reaches the get Images controller...")
    if(!req.params['imageName'])
    {
        //send the names of the files array;
        console.log(req.dataset_title);
        Dataset.find({"belongsTo":req.dataset_title},'filename originalname Status cannotation -_id',(err,doc)=>{
            if(err || !doc){
                console.log("the error is occured...")
                console.log("the error msg is ",err);
                res.send(err);
            }
            else 
            {
                console.log("the query executed succfully...");
                console.log(doc);
                res.send(doc);
            }
        })
    }
    else 
    {
        // send the file binary ...
        console.log("The file binary sending operation is exeecuted...")
        //res.send("The file binary sending operation is exeecuted...")
        console.log(req.params['imageName']);
        let filename=req.params["imageName"]
        Dataset.findOne({"filename":filename},'path -_id',(err,doc)=>{
            if(err || !doc)
            {
                res.send("failed to load the image...")
            }
            else
            {
                console.log(__dirname);
                res.sendFile(process.env.base_dir+doc.path)
            }
        })
    }
}


// Controller of the scaled image 
module.exports.getScaledImageData=async (req,res,next)=>{
    console.log("The request reaches the get Images controller...")
        //send the names of the files array;
        console.log(req.dataset_title);
        Dataset.find({"belongsTo":req.dataset_title,"Status":"completed"},'filename originalname anotations cannotation  -_id',(err,doc)=>{
            if(err || !doc){
                console.log("the error is occured...")
                console.log("the error msg is ",err);
                res.send(err);
            }
            else 
            {
                console.log("the query executed succfully...");
                console.log(doc);
                res.send(doc);
            }
        })
}