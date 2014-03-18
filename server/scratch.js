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
