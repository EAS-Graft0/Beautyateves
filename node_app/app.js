var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var appConfig = require('./conf/appConfig.js');
var multer = require('multer');

var app = express();
// Set global Express headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Enable bodyParser
app.use(bodyParser.json({
    limit: '100mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));


// Serve static files from angular app dist folder
app.use(express.static('../ang_app/dist'))

// Add all routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
    if (file[0] === '.') {
        return;
    }
    require(path.join(__dirname, 'routes', file))(app);
});

// Start listening
app.listen(8080);

var mobile_app = express();
mobile_app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mobile_app.use(bodyParser.json())
mobile_app.use(bodyParser.urlencoded({
    extended: true
}));
mobile_app.use(express.static('../mob_app/dist'))

// Add all routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
    if (file[0] === '.') {
        return;
    }
    require(path.join(__dirname, 'routes', file))(mobile_app);
});
// mobile_app.listen(80);

mobile_app.listen(84);

/* HTTPS SERVER */
const https = require('https');

const options = {
    key: fs.readFileSync('../purofitfood.key'),
    cert: fs.readFileSync('./puro.cer')
};


const myServer = https.createServer(options, mobile_app)

myServer.listen(443);

/* HTTPS SERVER */