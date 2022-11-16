const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorConstants = require('../errorConstants');
dotenv.config();
const url = process.env.DB_CONNECTION;

exports.openConnection = async () => {

    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});
    } catch (e) {
        responseObject = createReturnObject(false, 'openConnection', e.toString(), errorConstants.statusServerError);
        
        return responseObject;
    }

}

exports.closeConnection = async () => {

    try {
        await mongoose.connection.close();
    } catch (error) {
        //here must be the call to looger servise, but we haven't it, so I placed conosole.log to detect close connection iisues
        console.log('Connection is not closed. Error: ' + e.toString());
    }

}

createReturnObject = (status, method, result, statusCode) => {
    let responseObject = {
        status : status,
        method : method,
        result : result,
        status_code : statusCode 
    };

    return responseObject;
} 


        
