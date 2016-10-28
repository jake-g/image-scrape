var scraper = require('images-scraper'),
	fs = require('fs'),
	request = require('request-promise'),
	imageType = require('image-type'),
	bing = new scraper.Bing(),
	yahoo = new scraper.Yahoo(),
	picsearch = new scraper.Picsearch(),
	google = new scraper.Google();


function createSaveDir(path) {
	// Create save folder
	if (!fs.existsSync(path)) {
		console.log(path, 'not found...creating');
		fs.mkdirSync(path);
	}
}

function getFilename(url) {
	function looksLegit(f) { // checks valid ext (could still be corrupt)
		var ext = f.split('.').pop();
		return ['jpg', 'jpeg', 'png', 'bmp'].indexOf(ext) > -1;
	}
	try {
		var name = url.split('/').pop();
		if (!looksLegit(name)) {
			name = name + '.jpg'; // hack to fix
		}
		return name;
	} catch(err) {
		console.log(err);
		return undefined
	}
}

var getImage = function(r, path) {
	var file = path + getFilename(r.url);
	download(r.url, file, function(err) {
		if (err) {
			var file = path + getFilename(r.thumb_url);
			console.log('Attempting thumbnail', file);
			download(r.thumb_url, file, function(err) {
				if (err) return err;
			});
		}
	});
	console.log('Saved:', file + '\n');
	return file;
};


var download = function(url, dest, cb) {
	if (typeof dest === undefined || typeof url === undefined) {
		var err = new Error('link undefined')
		console.log(err);
		cb(err);
	}
	request.get(url)
		.on('error', function(err) {
			console.log('Error in file', dest);
			cb(err); // dipset
		})
		// .on('data', function (chunk) {
		//     console.log(imageType(chunk));
		//     //=> {ext: 'gif', mime: 'image/gif'}
		// })
		.pipe(fs.createWriteStream(dest));
};

var getResults = function(res, settings) { // links returned
	res.forEach(function(r, i) {
		console.log(settings.keyword, i + 1, '\n', r);
		getImage(r, settings.path); // get em
	});
};
///////////////////////////////////////////////////////

exports.yahoo = function (settings, cb) {
	createSaveDir(settings.path);
	yahoo.list(settings)
	.then(function(res){
		getResults(res, settings);
	})
	.catch(function(err) {
		cb(err);
	});
};

exports.picsearch = function (settings, cb) {
	createSaveDir(settings.path);
	yahoo.list(settings)
	.then(function(res){
		getResults(res, settings);
	})
	.catch(function(err) {
		cb(err);
	});
};

exports.bing = function(settings, cb) {
	createSaveDir(settings.path);
	bing.list(settings)
		.then(function(res){
			getResults(res, settings);
		})
		.catch(function(err) {
			cb(err);
		});
};

exports.google = function(settings, cb) {
	createSaveDir(settings.path);
	google.list(settings)
	.then(function(res){
		getResults(res, settings);
	})
	.catch(function(err) {
		cb(err);
	});
};
