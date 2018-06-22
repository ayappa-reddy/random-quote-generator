  quoteDisplay();
  $("#newQuote").on("click", function(event){
	event.preventDefault();
	quoteDisplay();
  });

function quoteDisplay() {
	function getRandomNumber (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var r = getRandomNumber(0, 255);
	var g = getRandomNumber(0, 255);
	var b = getRandomNumber(0, 255);
	var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
	var rgba = "rgba(" + r + ", " + g + ", " + b + ", 0.6)";
	$("body").css("background", rgb);
	$("#quoteText").css("color", rgb);
	$("#quoteAuthor").css("color", rgb);
	$(".icon").css("color", rgb);
	$("#newQuote").css("background", rgb);
	$("#newQuote").hover(function() {
		$(this).css("background", rgba);
		}, function() {
		$(this).css("background", rgb);
		}
	);

	$.ajax({
	url: 'https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json',
	cache: false
})
	.done(function(json) {
		var json = JSON.parse(json);
		var randomQuote = json[Math.floor(Math.random() * (json.length))];
		var text = randomQuote["quote"];
		var author = "- " +randomQuote["author"];
		
		$("#quoteText").text(text);
		$("#quoteAuthor").html(author);
		$(".twitter-share-button").on("click", function() {
			$(this).attr("href", 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + "\"" + text + "\" " + randomQuote["author"] + "#quotes");
		});
		$(".tumblr-share-button").on("click", function() {
			var link = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,gettingbetter&';
			link += 'caption=' + randomQuote["author"] + '&';
			link += 'content=' + text + '&';
			link += '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
			$(this).attr("href", link);
		});
	});
  }
