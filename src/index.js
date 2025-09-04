const express = require ('express');
const app = express();
const {port} = require('./config/serverconfig'); 
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index')

const startAndSetServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api', apiRoutes);
    app.listen(port,()=>{
        console.log("Server started on port:",port);
    })
}
startAndSetServer();