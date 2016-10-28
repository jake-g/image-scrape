var scraper = require('./image-scrape.js');

var settings = {
		keyword: 'puppy',
    path: '/Users/jake/Desktop/dogs/',
		num: 230,
    detail: true,
		nightmare: {  // browser
			show: false
		},
		advanced: {
			imgType: 'photo', // options: clipart, face, lineart, news, photo
			//resolution: 'l', // options: l(arge), m(edium), i(cons), etc.
			//color: undefined // options: color, gray, trans
		}
	};


// console.log('Start:', new Date().toUTCString());
// console.log(settings);

// // Scrape google
// // console.log('\nscraping google...');
// scraper.google(settings, function(err, res) {
//   if (err) {
//     console.log('err in google', err);
//   }
// });

// // Scrape bing
// // console.log('\nscraping bing...');
// scraper.bing(settings, function(err, res) {
//   if (err) {
//     console.log('err in bing', err);
//   }
// });
//
// // Scrape yahoo
// // console.log('\nscraping yahoo...');
// scraper.yahoo(settings, function(err, res) {
//   if (err) {
//     console.log('err in yahoo', err);
//   }
// });
//
// Scrape picsearch
// console.log('\nscraping yahoo...');
scraper.picsearch(settings, function(err, res) {
  if (err) {
    console.log('err in picsaerch', err);
  }
});

// console.log('Finished:', new Date().toUTCString());
// console.log('Exit');