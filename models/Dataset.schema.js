/* system imports */
const mongoose=require('mongoose');


/* Dataset schema */
const dataset_schema=new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    path: {
        type: String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    },
    belongsTo:{
        type:String,
        //required:true
    },
    createdBy:{
        type:String,
        //required:true
    },
    Status:{
        type:String,
        required:true,
        enum:["incomplete","inprogress","completed","rejected"]
    },
    anotations:[
        {
            left:{
                type:Number
            },
            top:{
                type:Number
            },
            width:{
                type:Number
            },
            height:{
                type:Number
            },
            label:{
                type:String
            }
        }
    ],
    message:{
        type:String
    }
})

const Dataset=mongoose.model('Dataset',dataset_schema)

module.exports = {Dataset}