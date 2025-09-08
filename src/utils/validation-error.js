const {StatusCodes} = require ('http-status-codes');
const AppErrors = require('./error-code');

class ValdiationError extends AppErrors{
    constructor(error){
        let errorName = error.name;
        let explaination = [];
        error.errors.forEach(err => {
            explaination.push(err.message); 
        });
        super(
            errorName,
            "Not able to validate the data sent in the request.",
            explaination,
            StatusCodes.BAD_REQUEST,
        )
    }
}

module.exports = ValdiationError;