var scraper = require('./image-scrape.js');

var settings = {
		keyword: 'dog',
    path: '/Users/jake/Desktop/tst/',
		num: 100,
		source: 'bing'
	};


scraper.scrape(settings, function(err, res) {
  if (err) {
    console.log('err', err);
  }
});
