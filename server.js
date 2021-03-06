// Birdspotter
// Author: Cedric Bongaerts
// NodeJS Server

// Init Express Web Framework
var express = require('express');
var app = express();
var path = require('path');


// Set view engine to EJS & set views directory
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'client', 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});


// Database Connection
var mongoose = require('mongoose');
var configDB = require('./server/config/database.js');
require('./server/routes/capture');
require('./server/routes/unknowncapture');
require('./server/routes/vote');
require('./server/routes/comment');
require('./server/routes/birdsuggestion');
require('./server/routes/voteBirdsuggestion');
require('./server/routes/follow');
require('./server/routes/notification');
mongoose.connect(configDB.url);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// Main route
app.get('/', function(req, res){
    res.render('index.html');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status(err.status || 404);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});

// API 
var api = express.Router();
require('./server/routes/capture')(api);
require('./server/routes/unknowncapture')(api);
require('./server/routes/comment')(api);
require('./server/routes/vote')(api);
require('./server/routes/birdsuggestion')(api);
require('./server/routes/voteBirdsuggestion')(api);
require('./server/routes/follow')(api); 
require('./server/routes/notification')(api); 
app.use('/api', api);

// Port Settings
app.listen(process.env.PORT || 3000, process.env.IP);
console.log('Listening on port ' + process.env.PORT);