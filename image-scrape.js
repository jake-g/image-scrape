var scraper = require('images-scraper'),
	fs = require('fs'),
	_ = require('lodash'),
	request = require('request-promise'),
	imageType = require('image-type'),
	bing = new scraper.Bing(),
	yahoo = new scraper.Yahoo(),
	picsearch = new scraper.Picsearch(),
	google = new scraper.Google();


var settings = {
	keyword: '',
	path: '',
	num: 10,
	detail: true,
	nightmare: { // browser
		show: false
	},
	advanced: {
		imgType: 'photo', // options: clipart, face, lineart, news, photo
		//resolution: 'l', // options: l(arge), m(edium), i(cons), etc.
		//color: undefined // options: color, gray, trans
	}
};


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
	} catch (err) {
		console.log(err);
		return undefined;
	}
}

var save = function(res) {
	res.map(function(img) {
		var file = settings.path + getFilename(img.url);
		download(img.url, file, function(err) {
			if (err) {
				var file = settings.path + getFilename(img.thumb_url);
				console.log('Attempting thumbnail', file);
				download(img.thumb_url, file, function(err) {
					if (err) return err;
				});
			}
		});
		console.log('Saved:', file + '\n');
		return file;
	});
};


var download = function(url, dest, cb) {
	if (typeof dest === undefined || typeof url === undefined) {
		var err = new Error('link undefined');
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


// TODO EXPORT function for each independent source

exports.all = function(args, cb) {
	settings = _.merge(settings, args);
	createSaveDir(settings.path);
	bing.list(settings).then(save);
	google.list(settings).then(save);
	picsearch.list(settings).then(save);
	return;
};
