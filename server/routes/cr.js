var request = require('request');
// var formdata = require('form-data');
var couchbase = require('couchbase');
var JSON = require('JSON');
var db = new couchbase.Connection({host: '10.14.31.24:8091', bucket: 'default'});

var getRemoteItem = function(id) {
  console.log('fetching item: ' + id);
  var cheerio = require('cheerio');
  var CR = new Object();
  var headers = ["ID", "Type","Title", "Information","Description"];
  var dict = [];
  var matched = false;

  request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=scope&scope=' + id, function(error, response, body) {
    var $ = cheerio.load(body);
    $('#scopeitem').children('h1').each(function (item) {
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
  res.json(CR);
};

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    // getRemoteItem(id);
    console.log('findById: ' + id);

    var cheerio = require('cheerio');
    var CR = new Object();
    var headers = ["ID", "Type","Title", "Information","Description"];
    var dict = [];
    var matched = false;

    db.get(id, function(err, result) {
      if (err) {
        // Failed to retrieve key
        console.log("no key in couchbase");
        request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=scope&scope=' + id, function(error, response, body) {
          var $ = cheerio.load(body);
          if ($('.itext').length > 0) {

            $('#scopeitem').children('h1').each(function (item) {
              console.log($(this).text());

              CR['id'] = id;
              CR['title'] = $(this).text();
            });
            CR['description'] = $('.itext').text();
            CR.type = "B2AT";
            console.log(CR);
          }

          db.set(id, CR, {expiry: 0}, function(err, result) {
            if (err) {
              console.log("Error on fetching couchbase item");
              console.log(err);
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
  var url = 'https://nielsen-buy.slack.com/services/hooks/incoming-webhook?token=f9DiEn10DkL2DAITVYFow68J';

  db.get(id, function(err, result) {
    console.log(result);
    if (err) {
      console.log('no cr');
      console.log(err);
    } else {
      var cr = result.value;
      cr.text = '*' + cr.title + '*' + '\n' + cr.description;
      console.log(cr);

      request.post(url, {form:{payload: JSON.stringify(cr)}}, function() {
        console.log('after post');
        res.send(200);
      });


    }
  })

};
