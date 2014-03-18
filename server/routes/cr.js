var request = require('request');

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);

    var url = require('url');

    var cheerio = require('cheerio');
    var CR = "";
    var headers = ["ID", "Type","Information","Description"];
    var dict = [];
    var matched = false;

    request('http://b2at-dev.nielsen.com/ViewReport.aspx?report=find&q=' + id, function(error, response, body) {
      // Hand the HTML response off to Cheerio and assign that to
      //  a local $ variable to provide familiar jQuery syntax.
      var $ = cheerio.load(body);

      // Exactly the same code that we used in the browser before:
      $('td').each(function (item) {
        if ($(this).text() === "CR" || $(this).text() === "ER") {
          console.log("found match on: " + $(this).text());
          $(this).addClass("cr");
          $(this).parent().addClass("cr");
          matched = true;
          // return false;
        }
      });

      if (matched) {
        var i = 0;
        $('tr.cr').children('td').each( function (item) {
          CR = CR.concat($(this).text() + "<br/>");
          dict.push({
            key: headers[i],
            value: $(this).text().trim()
          });
          console.log(headers[i] + " " + $(this).text().trim());
          i++;
        })

      }

    res.json(dict);


    });


};
