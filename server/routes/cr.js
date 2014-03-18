var request = require('request'),
    jsdom = require('jsdom').jsdom;

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    // db.collection('employees', function(err, collection) {
    //     collection.findOne({'id': id}, function(err, item) {
    //         console.log(item);
    //         res.jsonp(item);
    //     });
    // });
    // var util = require('util');
    var url = require('url');
  // , jsdom = require('jsdom').jsdom;

  // Print all of the news items on hackernews

  // jsdom.env({
  //   url: "http://b2at-dev.nielsen.com/ViewReport.aspx?report=find&q=3297",
  //   scripts: ["http://code.jquery.com/jquery.js"],
  //   done: function (errors, window) {
  //     // var $ = window.$;
  //     // console.log(window);
  //     var $ = require("jquery")(window);
  //     // console.log($);
  //     // console.log("HN Links");
  //     // $("td.title:not(:last) a").each(function() {
  //     //   console.log(" -", $(this).text());
  //     // });
  //     var matched = false;
  //     var CR = "";
  //
  //     $('td').each(function (item) {
  //       // console.log("this: " + $(this).text());
  //       if ($(this).text().match("CR")) {
  //         // console.log("found match");
  //         $(this).addClass("cr");
  //         matched = true;
  //       }
  //     });
  //
  //     if (matched) {
  //       $('td.cr').parent().children('td').each( function (item) {
  //         CR = CR.concat($(this).text() + "<br/>");
  //         // console.log("i: " + item)
  //       })
  //       console.log(CR);
  //     }
  //   }
  // });

var cheerio = require('cheerio');
var CR = "";

request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=find&q=329', function(error, response, body) {
  // Hand the HTML response off to Cheerio and assign that to
  //  a local $ variable to provide familiar jQuery syntax.
  var $ = cheerio.load(body);

  // Exactly the same code that we used in the browser before:
  $('td').each(function (item) {
    // console.log("this: " + $(this).text());
    if ($(this).text().match("CR")) {
      // console.log("found match");
      $(this).addClass("cr");
      matched = true;
    }
  });

  if (matched) {
    $('td.cr').parent().children('td').each( function (item) {
      CR = CR.concat($(this).text() + "<br/>");
      // console.log("i: " + item)
    })
    console.log(CR);
  }
});

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(CR);

};
