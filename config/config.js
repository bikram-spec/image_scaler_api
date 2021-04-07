const config=require('./config.json')
nodeenv=process.env.Node_Env || "development";
envdata=config[nodeenv]

Object.keys(envdata).forEach((key)=>{
    process.env[key] = envdata[key];
});