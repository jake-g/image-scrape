#!/usr/bin/env node

var process = require('process');
var scraper = require('./lib/scraper.js');
var args = process.argv.slice(2);
var settings = {};

if (args.length < 2) {
    console.log('missing arguments');
    console.log('run: scraper.js search_term number_of_images save_path');
    process.exit(1);
}

settings.keyword = args[0];
settings.num = args[1];
settings.path = args[2] ? args[2] : __dirname + '/' + args[0] + '/';

scraper.scrape(settings, function(err, res) {
    if (err) {
        console.log('err', err);
    } else {
        process.exit(0);
    }
});