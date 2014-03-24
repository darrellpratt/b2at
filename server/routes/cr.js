var request = require('request');

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

exports.findById = function(req, res) {
    console.log(req.params);
    console.log('here');
    var id = parseInt(req.params.id);
    getRemoteItem(id);
    console.log('findById: ' + id);

    var cheerio = require('cheerio');
    var CR = new Object();
    var headers = ["ID", "Type","Title", "Information","Description"];
    var dict = [];
    var matched = false;


    request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=scope&scope=' + id, function(error, response, body) {
        var $ = cheerio.load(body);
        if ($('.itext').length > 0) {

          $('#scopeitem').children('h1').each(function (item) {
            console.log($(this).text());

            CR['id'] = id;
            CR['title'] = $(this).text();
          });
          CR['description'] = $('.itext').text();
          console.log(CR);
        }

      console.log(CR);
      res.json(CR);
    });

    // };


};
