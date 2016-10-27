var scraper = require('images-scraper'),
	fs = require('fs'),
	request = require('request-promise'),
  imageType = require('image-type'),
	google = new scraper.Google();

var settings = {
		keyword: '',
    path: 'dogs/',
		num: 10,
    rlimit: 10,	// requests p second
		nightmare: {  // browser
			show: false
		},
		advanced: {
			imgType: 'photo', // options: clipart, face, lineart, news, photo
			//resolution: 'l', // options: l(arge), m(edium), i(cons), etc.
			//color: undefined // options: color, gray, trans
		}
	};

function getFilename(url) {
  function looksLegit(f) { // checks valid ext (could still be corrupt)
    var ext = f.split('.').pop();
    return ['jpg', 'jpeg', 'png', 'bmp'].indexOf(ext) > -1;
  }

	var name = url.split('/').pop();
	if (!looksLegit(name)) {
		name = name + '.jpg'; // hack to fix
	}
	return name;
}

var getImage = function(r) {
	var file = settings.path + getFilename(r.url);
	download(r.url, file, function(err, success) {
		if (err) {
			console.log('Error in file', file);
      var file = settings.path + getFilename(r.thumb_url);
      console.log('Attempting thumbnail', file);
			download(r.thumb_url, file, function(err, success) {
			  if (err) {
          return err;
			  }
			});
		}
	});
	console.log('Saved:', file + '\n');
	return file;
};

// request.get(url, function (res) {
//   res.once('data', function (chunk) {
//       res.destroy();
//       console.log(imageType(chunk));
//       //=> {ext: 'gif', mime: 'image/gif'}
//   });

var download = function(url, dest, cb) {
	request.get(url)
		.on('error', function(err) {
			console.log(err);
			cb(err.message); // dipset
		})
		.pipe(fs.createWriteStream(dest));
};


settings.keyword = 'Dog';
settings.num = 300;

// Script
console.log('Start:', new Date().toUTCString());
console.log(settings);
if (!fs.existsSync(settings.path)){
    console.log(settings.path, 'not found...creating');
    fs.mkdirSync(settings.path);
}

google.list(settings)
	.then(function(res) { // links returned
		res.forEach(function(r, i) {
			console.log(settings.keyword, i+1, '\n', r);
			getImage(r); // get em
		});
    console.log('Finished:', new Date().toUTCString());
	}).catch(function(err) {
		console.log('err in scraper', err);
	});
