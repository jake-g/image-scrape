# image scraper


Scrapes images from popular search engines using [this module](https://www.npmjs.com/package/images-scraper)
* google
* bing
* yahoo
* picsearch

### Command Line tool
* make sure you have correct permissions: `chmod 777 scraper.js`
* run with: `./scraper.js search_term number_of_images save_path`
* `search_term` is the keyword for images to scrape, `number_of_images` is the number (from each source) to download. 4 will result in 4 images from EACH source. `save_path` is optional. the default path is in this directory


### Use library in script
See `run_example.js` for usage example and example settings object
the `image-scrape.js` lib takes a `settings` object.
