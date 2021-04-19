const { scaler } = require('../../../models/Scaler_models/Scale.schema') 

module.exports.getprojectdone= (req,res,next)=>{
    scaler.findOne({"email":req.email},'task_completed -_id',(err,doc)=>{
        res.status(200).json(doc);
    })
}