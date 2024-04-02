/*******************************************************************
* Course            : SIT737 - Cloud Native Application Development
* Assesment         : 4.1P and 4.2C
* Student Name      : Cameron Mitchell
* Student ID        : s224040733
/******************************************************************/

// Import packages
const fs = require('node:fs');
var express = require("express")
const winston = require('winston');

// Create the web server/app object
var app = express()
var port = process.env.port || 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'calculator-microservice'
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
    ],
});

function validateInput(n1_raw, n2_raw) {
    try {

        const n1 = parseFloat(n1_raw);
        const n2 = parseFloat(n2_raw);

        if (isNaN(n1)) {
            logger.log({
                level: 'error',
                message: 'n1 is incorrectly defined'
            });
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.log({
                level: 'error',
                message: 'n2 is incorrectly defined'
            });
            throw new Error("n2 incorrectly defined");
        }

        logger.log({
            level: 'info',
            message: 'Parameters ' + n1 + ' and ' + n2 + ' received'
        });
    
        return [ true, n1, n2, "" ]
    } catch (error) {

        logger.log({
            level: 'error',
            message: error
        });

        return [ false, 0.0, 0.0, error.toString() ]

    }
}

app.get("/add", (req, res) => {
    var [valid, n1, n2, error] = validateInput(req.query.n1, req.query.n2)
    if ( valid ) {
        res.status(200).json({statuscocde:200, data: n1+n2 }); 
    } else {
        res.status(500).json({statuscocde:500, msg: error })
    }  
});

app.get("/subtract", (req, res) => {
    var [valid, n1, n2, error] = validateInput(req.query.n1, req.query.n2)
    if ( valid ) {
        res.status(200).json({statuscocde:200, data: n1-n2 }); 
    } else {
        res.status(500).json({statuscocde:500, msg: error })
    }  
});

app.get("/multiply", (req, res) => {
    var [valid, n1, n2, error] = validateInput(req.query.n1, req.query.n2)
    if ( valid ) {
        res.status(200).json({statuscocde:200, data: n1*n2 }); 
    } else {
        res.status(500).json({statuscocde:500, msg: error })
    }  
});

app.get("/divide", (req, res) => {
    var [valid, n1, n2, error] = validateInput(req.query.n1, req.query.n2)

    console.log(n2)

    if ( n2 == 0.0 && valid == true) {
        valid = false
        error = 'Unable to divide by zero'
        logger.log({
            level: 'error',
            message: error
        });
    }

    if ( valid ) {
        res.status(200).json({statuscocde:200, data: n1/n2 }); 
    } else {
        res.status(500).json({statuscocde:500, msg: error })
    }  
});


// Start listening for responses
app.listen(port, () => {
    console.log("App listening to: " + port)
    console.log("The Calculator with Logging Has Started!")
})