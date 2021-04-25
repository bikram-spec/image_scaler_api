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
    type:{
        type:String
    },
    Status:{
        type:String,
        required:true,
        enum:["incomplete","inprogress","completed","rejected"]
    },
    anotations:[
        {
            left:{
                type:String
            },
            top:{
                type:String
            },
            width:{
                type:String
            },
            height:{
                type:String
            },
            label:{
                type:String
            }
        }
    ],
    cannotation:[{
            type:String
    }],
    message:{
        type:String
    }
})

const Dataset=mongoose.model('Dataset',dataset_schema)

module.exports = {Dataset}