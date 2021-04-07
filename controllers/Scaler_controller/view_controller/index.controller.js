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
        res.render("pages/editor")
}
module.exports.demo=(req,res,next)=>{
    res.render("pages/demo");
}