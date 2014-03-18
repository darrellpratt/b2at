var request = require('request'),
    jsdom = require('jsdom').jsdom;

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);

    var url = require('url');
  
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
        //console.log(CR);
      }

      console.log(CR);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(CR);


    });


};
