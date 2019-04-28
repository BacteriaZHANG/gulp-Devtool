var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
var tinyImages = require('./build/tinypic.js');
dev();
prod();
tinyImages();