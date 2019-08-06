require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');



// Define the port to run on.
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
// add the node_module folder to the app to be able to call it from index.html
app.use('/node_modules', express.static(__dirname+'/node_modules'));

// middleware to use POST form parser
// needs to be before the /api route to apply
app.use(bodyParser.urlencoded({extended : false,}))
// angular send post in json not urlencoded
app.use(bodyParser.json());

// use the routes for other path that start with /api
//example http://localhost:3000/api/json
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
