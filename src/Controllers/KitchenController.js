const menuModel = require('../Models/Menu');
const errorConstants = require('../errorConstants');
const KitchenHelper = require('../Helpers/KitchenHelper');

exports.ordersPreparing = async (req,res) => {
    const ids = req.query.ids
    let pizzas;
    
    try{

        pizzas = await menuModel.getPositionsByIds(ids, 'getPositionsByIds');

    } catch(e) {

        result = createReturnObject(false, 'getPositionsByIds', e.toString(), errorConstants.statusServerError);
        res.status(result.status_code).send(result);

        return;
    }

    for (let pizza of pizzas){

        KitchenHelper.doughMake(pizza);
    }
}

