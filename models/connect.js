const mongoose=require('mongoose')

mongoose.Promise=global.Promise;

mongoose.connect(process.env.mongo_url,{ useNewUrlParser: true },(err)=>{
    if(!err){
        console.log("conection to the mongodb database successed.. ");
    }
    else{
        console.log("Error:- "+err);
    }
})
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useUnifiedTopology',true );