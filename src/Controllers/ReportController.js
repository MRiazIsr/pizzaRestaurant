const reportModel = require('../Models/Report');
const errorConstants = require('../errorConstants');

exports.getReportById = async (req, res) => {
    const id = req.query.id;

    let result;

    if (id == undefined) {
        result = createReturnObject(false, 'getReportById', errorConstants.limitIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 

    try{
        result = await reportModel.getReportById(offsetLimitObject, 'getReportById');  
    } catch(e) {
        result = createReturnObject(false, 'getReportById', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);
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

