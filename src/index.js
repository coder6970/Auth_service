const express = require ('express');
const app = express();
const {port} = require('./config/serverconfig'); 
const bodyParser = require('body-parser');
const db = require('./models/index')
const {User,Role} = require('./models/index')
const apiRoutes = require('./routes/index')

const startAndSetServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api', apiRoutes);
    app.listen(port,async ()=>{
        console.log("Server started on port:",port);
        db.sequelize.sync({alter : true})
        const u1 = await User.findByPk(2);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);

    })
}
startAndSetServer();