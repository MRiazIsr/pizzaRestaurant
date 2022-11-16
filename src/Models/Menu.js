const mongoose = require('mongoose');
const connectDB = require('../DB/DbConnection');
const errorConstants = require('../errorConstants');

const PositionSchema = mongoose.Schema({

    name : { 
        type : String,
        required : true
    },
    toppings : { 
        type : Array,
        required : true
    },   

}, { timestamps: false });

const position = mongoose.model('Positions', PositionSchema);

exports.getMenu = async (method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const res = await position.find();
        responseObject = createReturnObject(true, method, res, errorConstants.statusOk);
        await connectDB.closeConnection();
        
        return responseObject;
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
    
}

exports.getPositionsByIds = async (ids, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const res = await position.find({ '_id': { $in: ids } })
        responseObject = createReturnObject(true, method, res, errorConstants.statusOk);
        await connectDB.closeConnection();
        
        return responseObject;
    } catch (e) {
        await connectDB.closeConnection();
        responseObject = createReturnObject(false, method, e.toString(), errorConstants.statusBadRequest);
        
        return responseObject;
    }
}

exports.createPositions = async (body, method) => {
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const res = await position.insertMany(body);

        if (res === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);
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

exports.updatePosition = async (body, method) => {
    const id = body.id;
    const updates = body;
    let responseObject;

    try {
        //deleting property id of updates object, request to not update it or prevent type error
        delete updates.id;
      
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }

        const res = await position.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (res === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);
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

exports.deletePosition = async (id, method) => {
    const options = {select : '_id'};
    let responseObject;

    try {
        const openedConnection = await connectDB.openConnection();

        if (openedConnection != undefined) {
            return openedConnection;
        }
        
        const res = await position.findByIdAndDelete(id, options);

        if (res === null) {
            responseObject = createReturnObject(false, method, errorConstants.cantFind, errorConstants.statusBadRequest);

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