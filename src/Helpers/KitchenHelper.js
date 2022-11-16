const dotenv = require('dotenv');
dotenv.config();

let availableDoughChefs = 2;
let availableToppingChefs = 3;
let avaialbleOven = 1;
let availableWaiters = 2;

const DOUGH_TIME = process.env.DOUGH_TIME;
const ONE_TOPPING_TIME = process.env.ONE_TOPPING_TIME;
const OVEN_TIME = process.env.OVEN_TIME;
const WAITER_SERVING_TIME = process.env.WAITER_SERVING_TIME;

let doughQueue = [];
let toppingQueue = [];
let ovenQueue = [];
let waiterQueue = [];

exports.doughMake = (pizza) => {

    if (availableDoughChefs > 0){

        availableDoughChefs--;
        setTimeout(() => {

            availableDoughChefs++;

            toppingMake(pizza);

            if (doughQueue.length != 0){

                doughMake(doughQueue.shift());
            }
        }, DOUGH_TIME);
    } else {

        doughQueue.push(pizza);
    }
}

toppingStep = (pizza, toppingIndex) => {
    if (availableToppingChefs > 0){
        availableToppingChefs--;
        setTimeout(() => {
            availableToppingChefs++;
            if (toppingQueue.length != 0){
                let topping = toppingQueue.shift();
                toppingStep(topping.pizza, topping.toppingIndex);
            }
            if (toppingIndex == pizza.toppings.length - 1){
                ovenPut(pizza);
            }
        }, ONE_TOPPING_TIME);
    } else {

        toppingQueue.push({pizza, toppingIndex});
    }
}

toppingMake = (pizza) => {

    for (let i=0; i < pizza.toppings.length; i++){

        toppingStep(pizza, i);
    }
}

ovenPut = (pizza) => {

    if (avaialbleOven > 0){

        avaialbleOven--;
        setTimeout(() => {

            avaialbleOven++;
            waiterDeliver(pizza);

            if (ovenQueue.length != 0){

                ovenPut(ovenQueue.shift());
            }
        }, OVEN_TIME);
    } else {

        ovenQueue.push(pizza);
    }
}

waiterDeliver = (pizza) => {

    if (availableWaiters > 0){

        availableWaiters--;
        setTimeout(() => {

            availableWaiters++;

            if (waiterQueue.length != 0){

                waiterDeliver(waiterQueue.shift());
            }
        }, WAITER_SERVING_TIME);
    } else {

        availableWaiters.push(pizza);
    }
}