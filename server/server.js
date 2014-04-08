require ('newrelic');
var express = require('express'),
    path = require('path'),
    cr = require('./routes/cr');

var Firebase = require('firebase');
var myRootRef = new Firebase('https://amber-fire-1059.firebaseio.com/');
myRootRef.set("hello world!");

var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '../client/app')));

app.get('/api/cr/:id', cr.findById);
app.get('/api/cr/mock/:id', cr.mockFindById);

app.listen(3000);
console.log('Listening on port 3000...');
