# Logging Calculator

## Overview

The logging calculator allows a user to use rest API's to perform basic calculations such as addition, subtraction.multiplication, division. 

## Function Description.

Each API endpoint uses the validateInput function to determine if the provided input is valid. This validInput function checks that the variables are provided. For 4.2C this function was extended to support a single value using an optional boolean variable. This single value support was required for the square root calculation.

## How to Use!

The server responds to GET requests where two numbers, n1 and n2, are provided as query perameters. See below some examples of using the tool with curl commands.

#### Addition

curl "localhost:3000/add?n1=4&n2=2"                                              
{"statuscocde":200,"data":6}

#### Subtraction

curl "localhost:3000/add?n1=4&n2=2"                                              
{"statuscocde":200,"data":6}

#### Multiplication

curl "localhost:3000/multiply?n1=4&n2=2"
{"statuscocde":200,"data":8}

#### Division

curl "localhost:3000/divide?n1=4&n2=2"
{"statuscocde":200,"data":2}

#### Divide by Zero

curl "localhost:3000/divide?n1=4&n2=0"
{"statuscocde":500,"msg":"Unable to divide by zero"}

#### Calculate Exponential

curl "localhost:3000/exponent?n1=4&n2=2"
{"statuscocde":200,"data":16}

#### Calculate Square Root ( Note Only Single Value Required )

curl "localhost:3000/squareroot?n1=4"
{"statuscocde":200,"data":2}

#### Calculate Modulo

curl "localhost:3000/modulo?n1=4&n2=2"
{"statuscocde":200,"data":0}

#### Provide Invalid Input

curl "localhost:3000/subtract?n1=4"
{"statuscocde":500,"msg":"Error: n2 incorrectly defined"}

#### Error logs can be veiwed at logs/error.log

cat error.log
{"level":"error","message":"Unable to divide by zero","service":"calculator-microservice"}
{"level":"error","message":"n2 is incorrectly defined","service":"calculator-microservice"}