var request = require('request');
// config data for app
var config = require('../config.json');
// var formdata = require('form-data');
var couchbase = require('couchbase');
var JSON = require('JSON');


// couchbase connection, can point to any install
var db = new couchbase.Connection({
    host: config.couchbaseAddress,
    bucket: config.couchbaseBucket
});

var getRemoteItem = function(id) {
    console.log('fetching item: ' + id);
    var cheerio = require('cheerio');
    var CR = new Object();
    var headers = ["ID", "Type", "Title", "Information", "Description"];
    var dict = [];
    var matched = false;

    request(config.b2atUrl + id, function(error, response, body) {
        var $ = cheerio.load(body);
        $('#scopeitem').children('h1').each(function(item) {
            CR['id'] = id;
            CR['title'] = $(this).text();
        });
        CR['description'] = $('.itext').text();
    });
};


exports.mockFindById = function(req, res) {
    console.log(req.params);
    var CR = new Object();
    CR['id'] = parseInt(req.params.id);
    CR['title'] = 'CR Title here';
    CR['description'] = 'Description here';
    // res.json(CR);
    var id = parseInt(req.params.id);
};

// main lookup method
exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);

    var cheerio = require('cheerio');
    var CR = new Object();
    var headers = ["ID", "Type", "Title", "Information", "Description"];
    var dict = [];
    var matched = false;

    db.get(id, function(err, result) {
        if (err) {
            // Failed to retrieve key
            console.log("no key in couchbase");
            request(config.b2atUrl + id, function(error, response, body) {
                var $ = cheerio.load(body);
                if ($('.itext').length > 0) {

                    $('#scopeitem').children('h1').each(function(item) {
                        console.log($(this).text());

                        CR['id'] = id;
                        CR['title'] = $(this).text();
                    });
                    CR['description'] = $('.itext').text();
                    CR.type = "B2AT";
                    console.log(CR);
                }

                db.set(id, CR, {
                    expiry: 0
                }, function(err, result) {
                    if (err) {
                        console.log("Error on fetching couchbase item");
                        console.log(err);
                    } else {
                        console.log("CouchResult");
                        console.log(result);
                    }
                })

                console.log(CR);
                res.json(CR);
            });
        } else {
            console.log("couch");
            res.json(result.value);
            console.log("result");
            console.log(result);

        };
    })
    // };
};


exports.pushToSlack = function(req, res) {
    console.log('pushing to slack.com');
    var id = parseInt(req.params.id);
    // incoming webhook url for slack.
    var url = config.slackWebhook; 

    db.get(id, function(err, result) {
        console.log(result);
        if (err) {
            console.log('no cr');
            console.log(err);
        } else {
            var cr = result.value;
            cr.text = '*' + cr.title + '*' + '\n```' + cr.description + '```';
            console.log(cr);

            request.post(url, {
                form: {
                    payload: JSON.stringify(cr)
                }
            }, function() {
                console.log('after post');
                res.send(200);
            });
        }
    })
};

exports.deleteFromCouch = function(req, res) {
  
  var id = parseInt(req.params.id);
  console.log('deleting item from couchbase: ' + id);

  db.remove(id, function(err, result) {
    console.log(result);
    if (err) {
      console.log(err);
      res.send(404);
    } else {
      res.send(200);
    }
  });
};


