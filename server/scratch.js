var matched = false;
var CR = "";

$('td').each(function (item) {
	console.log("this: " + $(this).text());
	if ($(this).text().match("CR")) {
		console.log("found match");
		$(this).addClass("cr");
    matched = true;
	}
});

if (matched) {
  $('td.cr').parent().children('td').each( function (item) {
    CR = CR.concat($(this).text());
    console.log("i: " + item)
  })
}





//
var request = require('request'),
    jsdom = require('jsdom');

request({ uri:'http://www.google.com' }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting google.com')
  }

  jsdom.env({
    html: body,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ]
  }, function (err, window) {
    var $ = window.jQuery;

    // jQuery is now loaded on the jsdom window created from 'agent.body'
    console.log($('body').html());
  });
});
