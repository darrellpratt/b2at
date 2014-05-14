require('newrelic');
var express = require('express'),
    path = require('path'),
    cr = require('./routes/cr'),
    request = require('request');

var JSON = require('JSON');
 
var Firebase = require('firebase');
var myRootRef = new Firebase('https://slackintegrator-dp.firebaseio.com/cr/request');
myRootRef.on('child_added', function(snapshot) {
    console.log('Received message on firebase' + JSON.stringify(snapshot.val()));
    var crId = snapshot.val().text;
    if (typeof crId != 'undefined') {
        var out = crId.substr(crId.indexOf(':') + 1, crId.length).trim();
        console.log('looking for cr: ' + out);
        request('http://localhost:3000/api/cr/' + out, function(error, response, body) {
        		console.log('received result from request');
            console.log('BODY: ' + body);
            console.log('------');
            var crJson = JSON.parse(body);
            var cr = new Object();
            cr.text = '*' + crJson.title + '*' + '\n' + crJson.description;
            console.log('sending; ' + JSON.stringify(cr));
            var url = 'https://nielsen-buy.slack.com/services/hooks/incoming-webhook?token=f9DiEn10DkL2DAITVYFow68J';
 
            // we  have data. delete and send to slack
            request.post(url, {
                form: {
                    payload: JSON.stringify(cr)
                }
            }, function() {
                console.log('after post');
                // delete the firebase message
                myRootRef.remove();

            });
        });
    };
});

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
