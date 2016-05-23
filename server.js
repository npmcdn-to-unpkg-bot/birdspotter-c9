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

// Database Connection
var mongoose = require('mongoose');
var configDB = require('./server/config/database.js');
var captures = require('./server/routes/capture')
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
// API 
var api = express.Router();
require('./server/routes/capture')(api);
app.use('/api', api);

// // Set routes to other pages
// app.get('/*', function(req, res){
//     res.render('index.ejs');
// });

// Port Settings
app.listen(process.env.PORT || 3000, process.env.IP);
console.log('Listening on port ' + process.env.PORT);