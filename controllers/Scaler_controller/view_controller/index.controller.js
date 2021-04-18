// client view controller 

module.exports.ccchart=(req,res,next)=>{
    res.render("pages/cchart");
}

// scaler view controller 
// controller of the index.ejs
module.exports.index= (req,res,next)=>{
    res.render("pages/index");
}

// controller for the test 
module.exports.test = (req,res,next)=>{
    res.render("pages/test");
}

module.exports.editor= (req,res,next)=>{
        console.log(req.email)
        res.render("pages/editor",{user:req.email,_id:req._id})
}
module.exports.demo=(req,res,next)=>{
    res.render("pages/demo");
}