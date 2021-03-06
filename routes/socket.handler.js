// default imports 

// custom model imports 
const { Dataset }= require("../models/Dataset.schema");
const { projectDetails } = require("../models/projectDetail.schema");
const { scaler } = require("../models/Scaler_models/Scale.schema")

// other config import ...


const { getdetails } = require("../controllers/Scaler_controller/request_controller/scaler.getdetails.scontroller");

module.exports=(io)=>{
    // console.log("io",io)
    counter=0;
    // listening to the connection
    io.sockets.on('connection', function (socket) {

        counter++;
        // adding the auth handler here
        socket.on("auth",function(user){
            socket.email=user;
            console.log(user);
            scaler.findOne({"email":user},(err,doc)=>{
                if(err || !doc)
                {
                    console.log("invalid user");
                }
                else 
                {
                    socket.user=doc;
                }
            })
        })
        // adding the auth handler ends here

        //image annotation parts begin here 
            // sending details to the client to edit image 
            socket.on("getdetails",function(data){
                // callback begins here 
                console.log("request reaches  the getdetails connection")
                Dataset.findOne({"Status":"incomplete","type":data.type},(err,doc)=>{
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
                // converting the string annoration to json obj
                let anodata=JSON.parse(annotation_data)
                console.log(typeof(anodata));
                let doc=socket.doc;
                doc.Status="completed";
                doc.anotations=anodata;
                // adding task into the scaler profile begins
                let scaler=socket.user;
                scaler.task_completed=scaler.task_completed+1;
                scaler.save();
                // adding task to scaler profile ends ...
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
            
            // saving the classfication data
            socket.on("classfication",function(data){
                let doc=socket.doc;
                doc.Status="completed";
                console.log(data.objects);
                doc.cannotation=data.objects;
                // adding task into the scaler profile begins
                let scaler=socket.user;
                scaler.task_completed=scaler.task_completed+1;
                scaler.save();
                // adding task to scaler profile ends ...
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

            // saving broken message ..
            socket.on("broken",function(msg){
                let doc = socket.doc;
                doc.Status="rejected";
                doc.message=msg;
                // adding one task into the scaler profile
                let scaler=socket.user;
                scaler.task_completed=scaler.task_completed+1;
                scaler.save();
                // adding task to the user profile ends here 
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
        // the image annotation ends here 

        // test methdos to send the number of active users
        io.emit('message', { message: `there are ${counter} active user...` });

        // this will listen on the send method if there any
        socket.on('send', function (data) {
            io.sockets.emit('message', data);
        });

        // This will check for the disconnect of the socket
        socket.on("disconnect",function(){
            // console.log(socket.doc);
            // displaying the disconnect message on the console & decreasing user 
            console.log("the connection is exicted from the client...");
            counter--;

            // this is do close the document of the image annotation of the client
                // this variable store the information about the document 
                // which was editing by the scaler...;
                // image annotation & classfication start
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
                // image annotation & classfication  ends 
            // The image annotation closing complete here 

            // image classfication start

            // image classfication ends 


        })


        // to check whether the connection is accuired or not in scoket...
        console.log("welcome to the welcome to the socket.io ");
    });

}