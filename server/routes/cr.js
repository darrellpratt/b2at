var request = require('request');
var couchbase = require('couchbase');
var db = new couchbase.Connection({host: '10.14.31.24:8091', bucket: 'default'});

var getRemoteItem = function(id) {
  console.log('fetching item: ' + id);
  var cheerio = require('cheerio');
  var CR = new Object();
  var headers = ["ID", "Type","Title", "Information","Description"];
  var dict = [];
  var matched = false;

// old style request on search page, changing to detail page
//   request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=find&q=' + id, function(error, response, body) {
//     var $ = cheerio.load(body);
//     // Exactly the same code that we used in the browser before:
//     $('td').each(function (item) {
//       if ($(this).text() === "CR" || $(this).text() === "ER") {
//         console.log("found match on: " + $(this).text());
//         $(this).addClass("cr");
//         $(this).parent().addClass("cr");
//         matched = true;
//         return false;
//       }
//     });
//
//     if (matched) {
//       var i = 0;
//       $('tr.cr').children('td').each( function (item) {
//         dict.push({
//           key: headers[i],
//           value: $(this).text().trim()
//         });
//         CR[headers[i].toLowerCase()] = $(this).text().trim();
//         i++;
//       })
//     }
//     console.log(CR);
//   });
// };

  request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=scope&scope=' + id, function(error, response, body) {
    var $ = cheerio.load(body);
    $('#scopeitem').children('h1').each(function (item) {
      CR['id'] = id;
      CR['title'] = $(this).text();
    });
    CR['description'] = $('.itext').text();
  });

};

exports.findByIdX = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);

    var CR =  getRemoteItem(id);

    res.json(CR);
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
