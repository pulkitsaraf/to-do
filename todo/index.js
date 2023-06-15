// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

var https = require("https");
var http = require("http");
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// // Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var port = process.env.PORT || 3000;        // set our port

var router = express.Router();          

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

require('./routes')(app);


// START THE SERVER
// =============================================================================

// var server = https.createServer(options, app).listen(port);
var server = http.createServer(app).listen(port);
server.timeout = 10 * 60 * 1000;

console.log("server has been started at " + port);

process.on('uncaughtException', function (err) {
  console.log("Something went wrong: ", err);
});

