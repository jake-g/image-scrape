var scraper = require('./image-scrape.js');

var settings = {
		keyword: 'dog',
    path: '/Users/jake/Desktop/dogs/',
		num: 10,
	};



scraper.all(settings, function(err, res) {
  if (err) {
    console.log('err', err);
  }
});
