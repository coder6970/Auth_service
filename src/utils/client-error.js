const AppErrors = require('./error-code');

class ClientError extends AppErrors{
    constructor(name,message,description,statusCode){
        super(
            name,
            message,
            description,
            statusCode
        )
    }
}
module.exports = ClientError;