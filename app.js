var express = require('express');
var path = require('path');

//get Locator service
var Locator = require('./framework/locator');
var locator = new Locator();


// Register services in reverse dependency order
var StudentDomainObject = require('./domainObject/studentDomainObject');
locator.register('studentDomainObject', StudentDomainObject);

var StudentModel = require('./models/studentModel');
locator.register('studentModel', StudentModel);

var StudentController = require('./controllers/studentController');
locator.register('studentController', StudentController);



//Handle Express and Routing
var publicRouter = require('./routes/public');
var apiRouter = require('./api/api');

var app = express();

app.use(express.json());

//Setup router for the api
app.use('/api', apiRouter);
//Setup router for the public files
app.use('/', publicRouter);



//Create Server
const PORT = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))


module.exports = app;