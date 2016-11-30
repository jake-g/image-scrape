var scraper = require('./lib/scraper.js');

var settings = {
		keyword: 'dog',
    path: '/Users/jake/Desktop/tst/',
		num: 700,
		source: ''
	};


scraper.scrape(settings, function(err, res) {
  if (err) {
    console.log('err', err);
  }
});
