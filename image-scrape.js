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
    keyword: '', // search term
    path: '', // img save path
    source: '', // google, yahoo, picsearch, bing, default is all
    num: 10, // number of images from each source
    detail: true,
    nightmare: { // show browser (for chrome only)
        show: false
    },
    advanced: { // other filters
        imgType: 'photo', // options: clipart, face, lineart, news, photo
        //resolution: 'l', // options: l(arge), m(edium), i(cons), etc.
        //color: undefined // options: color, gray, trans
    }
};


function createSaveDir(path) { // create save folder
    // Create save folder
    if (!fs.existsSync(path)) {
        console.log(path, 'not found...creating');
        fs.mkdirSync(path);
    }
}

function getFilename(url) { // get filename from url
    function looksLegit(f) { // checks valid ext (could still be corrupt)
        var ext = f.split('.').pop();
        return ['jpg', 'jpeg', 'png', 'bmp', 'gif'].indexOf(ext) > -1;
    }
    try {
        var name = url.split('/').pop();
        return looksLegit(name) ? name : name + '.jpg'; // hack to fix
    } catch (err) {
        return null;
    }
}

var save = function(res, cb) { // save full resolution, if error try thumbnail
    res.map(function(img) {
        var filename = getFilename(img.url);
        if (typeof filename !== null) {
            var file = settings.path + filename;
            download(img.url, file, function(err) {
                if (err) { // try thumbnail
                    var file = settings.path + getFilename(img.thumb_url);
                    // download(img.thumb_url, file);
                    download(img.thumb_url, file, function(err) {
                        cb(err); // give up
                    });
                }
            });
            return file;
        }
    });
};


var download = function(url, dest, cb) { // download url image to dest
    var file = fs.createWriteStream(dest);
    request.get(url)
        .on('error', function(err) {
            fs.unlink(dest); // Delete the file async.
            cb(err.message);
        })
        .once('data', function(chunk) {
            if (!imageType(chunk)) {
                fs.unlink(dest); // Delete the file async.
                cb(new Error('not valid image file', url));
            }
        })
        .pipe(file)
        .on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
};


exports.scrape = function(args, cb) {
    settings = _.merge(settings, args);
    createSaveDir(settings.path);
    switch (settings.source) {
        case 'bing':
            bing.list(settings).then(save);
            break;
        case 'google':
            google.list(settings).then(save);
            break;
        case 'yahoo':
            yahoo.list(settings).then(save);
            break;
        case 'picsearch':
            picsearch.list(settings).then(save);
            break;
        default: // search all
            bing.list(settings).then(save);
            google.list(settings).then(save);
            picsearch.list(settings).then(save);
    }
};