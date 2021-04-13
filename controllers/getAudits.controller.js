/* defaults imports */

/* modeles import   */
const { Dataset } = require("../models/Dataset.schema");

/* main function */
module.exports.getAudits = (req,res,next)=>{
    /* This will store the info about the all the dataset */
    // eg:- [ { title: 'human faces', completed: 7, rejected: 0, incomplete: 9 } ]
    maindata=[];

    // this is the prefinal disconery which will store the informaiton of the prefinal data
    /* eg:- {
        'human faces': { title: 'human faces', completed: 7, rejected: 0, incomplete: 9 }
         }
    */
    mainobj={};

    // this are the temperature variable to store the value of the mongoose document
    let title,status,num;


    // instead of find in this i am going to do the aggreat this will directly deal with colleciton 
    // instead of the cursor
    Dataset.aggregate([ { "$match": { "createdBy": req.email } },{$group : {_id :{"belongsto":"$belongsTo","Status":"$Status"}, count : {$sum : 1}}}],(err,data)=>{
        if(err || !data)
        {
            // res.send("operation failed");
            res.status(204).json({"error":"There is no data available write now..."});
        }
        else  
        {
            // This will iterate through all the object which was returned by the aggreate function
            data.forEach((element)=>{
                title=element._id.belongsto;
                status=element._id.Status;
                num=element.count;
                
                // This is to create first object in the prefinal diconary
                // this if will add the key of the title  in the main obj for the first time
                if (!mainobj[title])
                {   
                    temp={"title":title,"completed":0,"rejected":0,"incomplete":0}
                    temp[status]=num
                    mainobj[title]=temp;
                }
                else 
                {
                    // This part will be execuuted if there is already key available of the name
                    // as the title in the pre-finaled dicinoary
                    temp=mainobj[title];
                    temp[status]=num;
                    mainobj[title]=temp;
                }        
          
            })

            // This will iterate through the pre-finaled diconary and add the value object to the
            // final dicionary
            Object.values(mainobj).forEach((item)=>{
                maindata.push(item);
            })

            // sendind the final dictionaty to the client...
            res.status(200).json(maindata);
        }
    })

}