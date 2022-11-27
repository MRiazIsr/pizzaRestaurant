# CRUD API for Pizza Restaurant 
* If on github readmy params looking not readable you can open it After Application is started in postman: 'http://localhost:3000/' 

### Technology used in the aplication: ###
* Node.js version 18+
* Expres.js for routing
* Mongodb localy
* Mongose for operations with mongodb  
* Docker
----------------------------------------------------------------------------------------------------------------------------------- 
### To start the application:
* Clone project from: https://github.com/MRiazIsr/pizzaRestaurant.git
* Create ".env" file from "env.examle"  
* Run "docker-compose up -d --build" 
-----------------------------------------------------------------------------------------------------------------------------------
### Main Logic:
* To start preparing pizzas, you need to create menu by /menu/create-positions
* This bulk post request, param of this requset must be array of objects with pizzas informaition, you can see more in example:

 ```json
 [
    { 
        "name": "Bacon",
        "toppings": ["cheese", "bacon", "tomato"]
    }    
    ,
    {
        "name": "Peperony",
        "toppings": ["cheese", "salami"]
    }
]   
 ```

* When you ready to preapring you need to call /kitchen/make-pizza
* This post request require array of pizzas ids, you can recive it in response of /menu/create-positions or /menu/get-all-positions
* Also you can change positions, delete them, or reciev report by id if you need it 
-----------------------------------------------------------------------------------------------------------------------------------     
### API Documentation (postman)
-----------------------------------------------------------------------------------------------------------------------------------
#### Menu Routes

* Request format: JSON
* Header: Content-type - Application/json

* Get Menu:<br>  

|              URI              |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|:-----------------------------:|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|     /menu/get-all-positions   |      GET      |               |                   |                  |                |

* Create Position:<br>

|            URI           |      TYPE      |          PARAMS         |      PARAM TYPE      |     REQUIRED     |     DEFAULT    |
|:------------------------:|:--------------:|:-----------------------:|:--------------------:|:----------------:|:--------------:|     
|  /menu/create-positions  |      POST      | Array Of Pizzas Objects |         Array        |       TRUE       |                |

Example:

 ```json
 [
    { 
        "name": "Bacon",
        "toppings": ["cheese", "bacon", "tomato"]
    }    
    ,
    {
        "name": "Peperony",
        "toppings": ["cheese", "salami"]
    }
]   
 ```

 >name type String
 >
 >toppings type Array

* Update Position:<br>

|           URI           |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|:-----------------------:|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|  /menu/update-position  |     PATCH     |       id      |       STRING      |       TRUE       |                |
|                         |               |      name     |       STRING      |       FALSE      |                |
|                         |               |    toppings   |       ARRAY       |       FALSE      |                |

* Delete Task:<br>

|            URI          |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|:-----------------------:|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|  /menu/delete-position  |     DELETE    |       id      |       STRING      |       TRUE       |                |

---------------------------------------------------------------------------------------------------------------------------------- 
#### Kitchen Routes

* Request format: JSON
* Header: Content-type - Application/json

* Prepare Pizzas:<br>

|            URI           |      TYPE      |         PARAMS        |      PARAM TYPE      |     REQUIRED     |     DEFAULT    |
|:------------------------:|:--------------:|:---------------------:|:--------------------:|:----------------:|:--------------:|     
|    /kitchen/make-pizza   |      POST      |  Array Of Pizzas Ids  |         Array        |       TRUE       |                |

Example:

 ```json
[
    "637541a7c02e252a46bdb330",
    "63752aa762d16c12c92b14ab",
    "63752aa762d16c12c92b14aa"
]  
 ```

> Ids you can get from "Menu Routes", "Get Menu"
    
-------------------------------------------------------------------------------------------------------------------------------
#### Report Routes

* Request format: JSON
* Header: Content-type - Application/json

* Prepare Pizzas:<br>

|            URI           |      TYPE      |      PARAMS     |      PARAM TYPE      |     REQUIRED     |     DEFAULT    |
|:------------------------:|:--------------:|:---------------:|:--------------------:|:----------------:|:--------------:|     
|     /report/get-by-id    |       GET      |        id       |        String        |       TRUE       |                |


> Id of report you can get from "Kitchen Routes", "Prepare Pizzas".
    
---------------------------------------------------------------------------------------------------------------------------     

### Response

* ERROR STATUS CODES :
- 200 Status OK,
- 400 Bad Ruqest (Validation Problems),
- 500 Server Error (Database Connection Error, Code Error),

### Response examples 200

* /menu/get-all-positions 200: 
 
 ```json
{
    "status": true,
    "method": "getMenu",
    "result": [
        {
            "_id": "6375296c1a44b45f3f954d78",
            "name": "Bacon",
            "toppings": [
                "cheese",
                "bacon",
                "tomato"
            ],
            "__v": 0
        },
        {
            "_id": "6375296c1a44b45f3f954d79",
            "name": "Peperony",
            "toppings": [
                "cheese",
                "salami"
            ],
            "__v": 0
        },
        {
            "_id": "63752aa762d16c12c92b14aa",
            "name": "Bacon",
            "toppings": [
                "cheese",
                "bacon",
                "tomato"
            ],
            "__v": 0
        },
        {
            "_id": "63752aa762d16c12c92b14ab",
            "name": "Peperony",
            "toppings": [
                "cheese",
                "salami"
            ],
            "__v": 0
        },
        {
            "_id": "637541a7c02e252a46bdb330",
            "name": "Cheese",
            "toppings": [
                "cheese",
                "cheese",
                "cheese"
            ],
            "__v": 0
        }
    ],
    "status_code": 200
}
```

* /menu/create-positions 200:

```json
{
    "status": true,
    "method": "createPositions",
    "result": [
        {
            "name": "Bacon",
            "toppings": [
                "cheese",
                "bacon",
                "tomato"
            ],
            "_id": "63757165043d016f1b7d6c26",
            "__v": 0
        },
        {
            "name": "Peperony",
            "toppings": [
                "cheese",
                "salami"
            ],
            "_id": "63757165043d016f1b7d6c27",
            "__v": 0
        }
    ],
    "status_code": 200
}
```

* /menu/update-position 200:

```json
{
    "status": true,
    "method": "updatePosition",
    "result": {
        "_id": "637541a7c02e252a46bdb330",
        "name": "Cheese",
        "toppings": [
            "cheese",
            "cheese",
            "cheese"
        ],
        "__v": 0
    },
    "status_code": 200
}
```

* /menu/delete-position 200:

```json
{
    "status": true,
    "method": "deletePosition",
    "result": {
        "_id": "637541a7c02e252a46bdb331"
    },
    "status_code": 200
}
``` 

* /kitchen/make-pizza 200:

```json
{
    "status": true,
    "method": "createReport",
    "result": {
        "orders": [
            {
                "pizzaName": "Bacon",
                "timeSpent": 26.046000003814697
            },
            {
                "pizzaName": "Peperony",
                "timeSpent": 36.06099987030029
            },
            {
                "pizzaName": "Cheese",
                "timeSpent": 39.03499984741211
            }
        ],
        "processTime": "46.068000078201294",
        "_id": "637584da2b66d19721ee525d",
        "createdAt": "2022-11-17T00:48:26.603Z",
        "updatedAt": "2022-11-17T00:48:26.603Z",
        "__v": 0
    },
    "status_code": 200
}
``` 
* /report/get-by-id 200:

```json
{
    "status": true,
    "method": "getReportById",
    "result": [
        {
            "_id": "637584da2b66d19721ee525d",
            "orders": [
                {
                    "pizzaName": "Bacon",
                    "timeSpent": 26.046000003814697
                },
                {
                    "pizzaName": "Peperony",
                    "timeSpent": 36.06099987030029
                },
                {
                    "pizzaName": "Cheese",
                    "timeSpent": 39.03499984741211
                }
            ],
            "processTime": "46.068000078201294",
            "createdAt": "2022-11-17T00:48:26.603Z",
            "updatedAt": "2022-11-17T00:48:26.603Z",
            "__v": 0
        }
    ],
    "status_code": 200
}
``` 