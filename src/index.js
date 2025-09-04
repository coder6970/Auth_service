const express = require ('express');
const app = express();
const {port} = require('./config/serverconfig') 

const startAndSetServer = ()=>{
    app.listen(port,()=>{
        console.log("Server started on port:",port);
    })
}
startAndSetServer();