const {users}=require('../models/signup.schema');
const ObjectId=require('mongoose').Types.ObjectId;

module.exports.userProfile=(req,res,next)=>{
    console.log(req.email);
    users.findOne({_id:req._id})
        .populate('Dataset_details')
        .exec((err,doc)=>{
/*             console.log(doc);
            console.log(err); */
            res.send(doc);

        })
}



