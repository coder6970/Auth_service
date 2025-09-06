const dotenv = require('dotenv')
dotenv.config();
const bcrypt = require('bcrypt')
module.exports = {
    port : process.env.port,
    SALT : bcrypt.genSaltSync(10),
    JWT_KEY:process.env.JWT_KEY
}