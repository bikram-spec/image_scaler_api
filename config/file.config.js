const fs=  require('fs');
const path=require('path');

/* module.exports.user_directory_checker=(req,res,next)=>{
    user_email=req.body.email.split('@')[0];
    console.log("the project holder email  is :- ",user_email);
    console.log(__dirname)
    if(fs.existsSync(`${process.env.root_dir}/${user_email}`))
    {
        console.log("directory exits...");
        this.dataset_directory_checker(req,res,next);
    }
    else 
    {
        console.log("the directory does not exists");
        fs.mkdir(path.join(process.env.root_dir,user_email),{recursive: true},function (err){
            if(err)
            {
                console.log("faild  to create direcotory ");
                console.log(err);
            }
            else 
            {
                console.log("directory created succfully");
                this.dataset_directory_checker(req,res,next);
            }
        })
    }
} */

module.exports.dataset_directory_checker=(req,res,next)=>{
    user_email=req.email.split('@')[0];
    dataset_name=req.dataset_title;
    console.log("the  project holder email is :- ",user_email);
    console.log("the Dataset name is :- ",dataset_name);
    
    if(fs.existsSync(`${process.env.root_dir}/${user_email}/${dataset_name}`))
    {
        console.log("the directory exits...");
        console.log(`${process.env.root_dir}/${user_email}/${dataset_name}`);
        req.lol=`${process.env.root_dir}/${user_email}/${dataset_name}`;
        // this.dataset_directory_checker(req,res,next);
        next();
    }
    else
    {
        console.log("the directory does not  exits... ");
        fs.mkdir(`${process.env.root_dir}/${user_email}/${dataset_name}`,{recursive: true},function(err){
            if(err)
            {
                console.log("falied to cereate a directory...");
            }
            else 
            {
                console.log("succfully created direcotory...");
                console.log(`${process.env.root_dir}/${user_email}/${dataset_name}`);
                req.lol=`${process.env.root_dir}/${user_email}/${dataset_name}`;
                next();
            }
        })
    }
}