const mongoose = require('mongoose');
const connectDB = require('../DB/DbConnection');
const errorConstants = require('../errorConstants');
const ReportSchema = mongoose.Schema({

    orders : { 
        type : String,
        required : true
    },
    processTime : { 
        type : String,
        required : true
    },   

}, { timestamps: true });

const report = mongoose.model('Reports', ReportSchema);

exports.getReportById = async (id, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const res = await report.find({ '_id': id })
        responseObject = createReturnObject(true, method, res, errorConstants.statusOk);
        await connectDB.closeConnection();
        
        return responseObject;
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
}

exports.createReport = async (body, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const res = await report.create(body);

        if (res === null) {
            responseObject = createReturnObject(false, method, cantFind, errorConstants.statusBadRequest);
            await connectDB.closeConnection();

            return responseObject;
        } else {
            responseObject = createReturnObject(true, method, res, errorConstants.statusOk);
            await connectDB.closeConnection();

            return responseObject;
        }
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
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