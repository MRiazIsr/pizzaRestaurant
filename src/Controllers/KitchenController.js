const menuModel = require('../Models/Menu');
const reportModel = require('../Models/Report');
const errorConstants = require('../errorConstants');
const KitchenHelper = require('../Helpers/KitchenHelper');

exports.ordersPreparing = async (req,res) => {
    const ids = req.query.ids
    let pizzas;
    let dateStartOrder;
    let dateEndOrder;
    let dateStartProcess;
    let dateEndProcess;
    let orderDiff;
    let processDiff;
    let reportOrder = [];
    let report;

    
    try{

        pizzas = await menuModel.getPositionsByIds(ids, 'getPositionsByIds');

    } catch(e) {

        result = createReturnObject(false, 'getPositionsByIds', e.toString(), errorConstants.statusServerError);
        res.status(result.status_code).send(result);

        return;
    }

    dateStartProcess = new Date().toString();
    for (let pizza of pizzas){

        dateStartOrder = new Date().toString();
        KitchenHelper.doughMake(pizza);
        dateEndOrder = new Date().toString();

        orderDiff = dateStartOrder - dateEndOrder;
        reportOrder.push({
            pizzaName : pizza.name,
            timeSpent : orderDiff
        });
    }
    dateEndProcess = new Date().toString();
    processDiff = dateStartProcess - dateEndProcess;

    report = {
        orders : JSON.stringify(reportOrder),
        processTime : processDiff
    }

    try{
        result = await reportModel.createReport(report, 'createReport');  
    } catch(e) {
        result = createReturnObject(false, 'createReport', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);
}

