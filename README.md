# image scraper

Scrapes images from popular search engines using [this module](https://www.npmjs.com/package/images-scraper)
* google
* bing
* yahoo
* picsearch

### Install
* get stable version of node
* in the root of this repo run: `npm install`


### Command Line tool
* make sure you have correct permissions: `chmod 777 image-scrape.js`
* run with: `./image-scrape.js search_term number_of_images save_path`
* `search_term` is the keyword for images to scrape, `number_of_images` is the number (from each source) to download. 4 will result in 4 images from EACH source. `save_path` is optional. the default path is in this directory
* if you want to run this from any path on your computer, 


### Use library in script
* See `run-example.js` for usage and settings object example
the `lib/scraper.js` lib takes a `settings` object.
