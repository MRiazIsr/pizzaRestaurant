const menuModel = require('../Models/Menu');
const errorConstants = require('../errorConstants');

exports.getMenu = async (req, res) => {
    const offsetLimitObject = { 
        offset : req.query.offset ?? 0,
        limit : req.query.limit
    };

    let result;

    if (offsetLimitObject.limit == undefined) {
        result = createReturnObject(false, 'getMenu', errorConstants.limitIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 

    try{
        result = await menuModel.getMenu(offsetLimitObject, 'getMenu');  
    } catch(e) {
        result = createReturnObject(false, 'getMenu', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);
}    
   

exports.createPositions = async (req,res) => {
    let body = req.body;
    let result;

    if (body == undefined) {
        result = createReturnObject(false, 'createPositions', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    } 
    
    try{
        result = await menuModel.createPositions(body, 'createPositions');
    } catch(e) {
        result = createReturnObject(false, 'createPositions', e.toString(), errorConstants.statusServerError);
    }
     
    res.status(result.status_code).send(result);

}

exports.updatePosition = async (req, res) => {
    const body = req.body;
    let result;

    if (body == undefined || body.id == undefined) {
        result = createReturnObject(false, 'updatePosition', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    }
    
    try{
        result = await menuModel.updatePosition(body, 'updatePosition');
    } catch(e) {
        result = createReturnObject(false, 'updatePosition', e.toString(), errorConstants.statusServerError);
    }
   
    res.status(result.status_code).send(result);
}

exports.deletePosition = async (req, res) => {
    const id = req.body.id;
    let result;

    if (id == undefined) {
        result = createReturnObject(false, 'deletePosition', errorConstants.idIsRequired, errorConstants.statusBadRequest);
        res.status(result.status_code).send(result);

        return;
    }

    try{
        result = await menuModel.deletePosition(id, 'deletePosition');
    } catch(e) {
        result = createReturnObject(false, 'deletePosition', e.toString(), errorConstants.statusServerError);
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

