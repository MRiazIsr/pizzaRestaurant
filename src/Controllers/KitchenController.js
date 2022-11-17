const menuModel = require('../Models/Menu');
const reportModel = require('../Models/Report');
const errorConstants = require('../errorConstants');
const KitchenHelper = require('../Helpers/KitchenHelper');

exports.ordersPreparing = async (req,res) => {
    const ids = req.body
    let pizzas;
    let dateStartProcess;
    let dateEndProcess;
    let reportOrder = [];
    let report;

    
    try{

        pizzas = await menuModel.getPositionsByIds(ids, 'getPositionsByIds');
    } catch(e) {

        result = createReturnObject(false, 'getPositionsByIds', e.toString(), errorConstants.statusServerError);
        res.status(result.status_code).send(result);

        return;
    }
    
    let promises = [];
    for (let pizza of pizzas.result){

        promises.push( new Promise (resolve => {
            pizza.resolve = resolve;
            KitchenHelper.doughMake(pizza);
        }));
    }

    Promise.all(promises)
        .then( (pizzas) => {
            pizzas.forEach((element) => {
                reportOrder.push({
                    pizzaName : element.name,
                    timeSpent : element.endTime - element.startTime
                });
            })
        });
        
    dateStartProcess = Date.now();  
    await Promise.all(promises);
    dateEndProcess = Date.now();

    report = {
        orders : reportOrder,
        processTime : dateEndProcess/1000 - dateStartProcess/1000
    }

    try{
        result = await reportModel.createReport(report, 'createReport');  
    } catch(e) {
        result = createReturnObject(false, 'createReport', e.toString(), errorConstants.statusServerError);
    }

    res.status(result.status_code).send(result);
}

