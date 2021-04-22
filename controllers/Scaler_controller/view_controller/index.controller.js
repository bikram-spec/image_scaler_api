// client view controller 
// This controller is to display the chart to the client
module.exports.ccchart=(req,res,next)=>{
    const labels=req.labels;
    console.log(req.labels);
    res.render("pages/cchart",{completed:req.completed,rejected:req.rejected,incomplete:req.incomplete});
}

// this controller is used to display image annotation to the client
module.exports.editor= (req,res,next)=>{
    console.log(req.email)
    res.render("pages/editor",{user:req.email,_id:req._id})
}

// this controller is used to display the clasfication editor to the client
module.exports.ceditor=(req,res,next)=>{
    res.render("pages/ceditor");
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


module.exports.demo=(req,res,next)=>{
    res.render("pages/demo");
}