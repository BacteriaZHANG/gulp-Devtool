'use strict'
var tinify = require('tinify');
var through2 = require('through2');

var _tinify = function (obj) {
    var stream = through2(function(file, encoding, cb) {
        if(file.isNull()) {
            console.log('isNull');
            this.push(file);
            return cb();
        }

        if(file.isStream()) {
            console.log('isStream');
            this.emit('error');
            return cb();
        }

        if(file.isBuffer()) {
            tinify.key = obj.key;
            tinify.proxy = obj.proxy;
            tinify.fromBuffer(file).toBuffer(function(err, result) {
                console.log(typeof result)
                if(err) throw err;
                file = result;
            });
            this.push(file);
            return cb();
        }
    });
    return stream;
}

module.exports._tinify = _tinify;
