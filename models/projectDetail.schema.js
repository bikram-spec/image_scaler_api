/* default modules import */
const mongoose =require('mongoose')

/* main function to retuen */
const projectDetailSchema=new mongoose.Schema({
    Dataset_title: {
        type:String,
        unique:true,
        required:true
    },
    Instruction:{
        type:String,
        required:true
    },
    Date_of_creaction: {
        type:Date,
        required:true
    },
    CreatedBy: {
        type: String,
        required:true
    },
    Dataset_type : {
        type: String,
        required:true,
        enum:['image annotation','image classfication']
    },
    Dataseet_Data: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dataset'
    }],
    ObjectsToAnnotate:[{
        type:String
    }]
})

const projectDetails= mongoose.model('projectDetails',projectDetailSchema)

module.exports= {projectDetails};