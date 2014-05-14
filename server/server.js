require ('newrelic');
var express = require('express'),
    path = require('path'),
    cr = require('./routes/cr');

var Firebase = require('firebase');
var myRootRef = new Firebase('https://amber-fire-1059.firebaseio.com/');
myRootRef.set("hello world!");

var app = express();
app.use(express.logger());
app.use(express.compress());

app.use(express.bodyParser());
// app.use(express.staticCache());
app.use(express.static(path.join(__dirname, '../client/app')));

app.get('/cr/:id', function(req, res) {
  console.log('into cr/:id');
  res.redirect('/#/cr/' + req.params.id)
});
app.get('/api/cr/:id', cr.findById);
app.get('/api/cr/mock/:id', cr.mockFindById);

app.get('/api/cr/slack/:id', cr.pushToSlack);

app.listen(3000);
console.log('Listening on port 3000...');
