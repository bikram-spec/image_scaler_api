/* prebuilt modules import */
const multer= require('multer');
const path=require('path');
const fs=require('fs');

/*  main function */
/* Storage function  */

var storage=multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null,req.lol);
            /* for this to work there needs to be the folder with above name in the workspace  */
        },
        filename: function(req,file,cb){
            cb(null,Date.now()+'-'+file.originalname)
        }
    }
)
/* filter manager function  */
const filter=function(req,file,cb){
    // let ext=path.extname(file.originalname)
    if(file.mimetype==="image/jpg" || file.mimetype==="image/jpeg" || file.mimetype=="image/png"){
        cb(null,true)
    }
    else 
    {
        cb(new Error("invalid file format "));
    }
}

/*  limit manager peoperty */

const limit={
    fileSize:1024*1024*25
}

var upload = multer({storage:storage,fileFilter:filter,limits:limit})
module.exports= { upload }