// default imports 

// custom model imports 
const { Dataset }= require("../models/Dataset.schema");
const { projectDetails } = require("../models/projectDetail.schema");

// other config import ...


const { getdetails } = require("../controllers/Scaler_controller/request_controller/scaler.getdetails.scontroller");

module.exports=(io)=>{
    // console.log("io",io)
    counter=0;
    io.sockets.on('connection', function (socket) {

        counter++;
        // sending details to the client to edit image 
        socket.on("getdetails",function(){
            // callback begins here 
            console.log("request reaches  the getdetails connection")
            Dataset.findOne({"Status":"incomplete"},(err,doc)=>{
                if(err || !doc)
                {
                    //res.send("There is no data write now to scale...");
                    // res.json({"success":"There is no data write now"})
                    console.log("There is no data write now..");
                    socket.emit("details",{data:"There is no Data available write now..."})
                }
                else 
                {
                    console.log(doc.belongsTo);
                    projectDetails.findOne({"Dataset_title":doc.belongsTo},(err,data)=>{
                        if(err || !data)
                        {
                            // res.send("invalid operation you are trying to perform ")
                            socket.emit("details",{error:"invalid operation you are trying to perform..."})
                        }
                        else 
                        {
                            console.log(doc.filename);
                            var dataobj=data.toObject();
                            dataobj.filename=doc.filename;
                            doc.Status="inprogress";
                            socket.doc=doc;
                            doc.save().then((doc,err)=>{
                                if(err || !doc)
                                {
                                    // res.send("internal server error occured ....");
                                    socket.emit("details",{error:"invalid sever error "});
                                    console.log("The Server is failed to update the document status...");
                                }
                                else
                                {
        
                                    // res.send(dataobj);
                                    socket.emit("details",dataobj);
                                    console.log("The Status of the image:- ",doc.Status);
                                    console.log("update to the doument is also succfully...");
                                    console.log(dataobj);
                                }
                            })
                        }
                    })

                }
            })


        });

        // Saving Anotation
        socket.on("annotations",function(annotation_data){
            let anodata=JSON.parse(annotation_data)
            console.log(typeof(anodata));
            let doc=socket.doc;
            doc.Status="completed";
            doc.anotations=anodata;
            doc.save().then((doc,err)=>{
                if(err || !doc)
                {
                    socket.emit("msg","The image is failed to update")
                }
                else 
                {
                    socket.emit("msg","The Image is updated succfully...");
                }
            })
        })
        

        // broken message ..
        socket.on("broken",function(msg){
            let doc = socket.doc;
            doc.Status="rejected";
            doc.message=msg;
            doc.save().then((doc,err)=>{
                if(err,!doc)
                {
                    console.log("there is an error occured on the server...");
                    socket.emit("msg",{"msg":"Internal server error..."})
                }
                else 
                {
                    console.log("The data is saved into the server succfully ...");
                    socket.emit("msg","The Image is updatd succfully into the server...");
                }
            })
        })
        // sending details  to the client ends here ...

        // test methdos 
        io.emit('message', { message: `there are ${counter} active user...` });
        socket.on('send', function (data) {
            io.sockets.emit('message', data);
        });
        socket.on("disconnect",function(){
            // console.log(socket.doc);
            console.log("the connection is exicted from the client...");
            counter--;
            let doc=socket.doc;
            if(doc && doc.Status=="inprogress")
            {
                doc.Status="incomplete";
                doc.save().then((doc,err)=>{
                    if(err || !doc)
                    {
                        console.log("wrongly disconnected...");
                    }
                    else
                    {
                        console.log("succfully disconnected...");
                    }
                })
            }
        })
        console.log("welcome to the welcome to the socket.io ");
    });

}