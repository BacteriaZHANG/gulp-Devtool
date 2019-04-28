var path = require('path');
var gulp = require('gulp');
var fancyLog = require('fancy-log');
var chalk = require('chalk');
var del = require('del');
var gulptiny = require('./gulp_tiny')._tinify;

var tinypic = {
    /**
     * [apikey 申请:https://tinypng.com/developers]
     */
    key: '7Gi9g8G4nIbPLJOsHfrS7gWVfZQYsmRv',
    proxy: 'http://waibao01:ncl@12345@10.5.3.9:80',
    keep: true // 是否保留源图片
};


function tinyImages() {
    function tiny() {
        var APIKEY = tinypic.key;

        if (!APIKEY) {
            fancyLog(chalk.red('未配置APIKey'));
            fancyLog(chalk.red('申请APIkey:https://tinypng.com/developers'));
            fancyLog(chalk.red('请在项目的 tinypic.js 中配置 tinypic:{apikey:\'申请的APIKEY\'}'));
            return;
        }

        fancyLog(chalk.yellow('已启动压缩程序...请耐心等待...'));

        return gulp.src('dist/images/*.{png,jpg,jpeg}')
            .pipe(gulptiny(tinypic))
            .pipe(gulp.dest('dist/tinypic'))
            .on('data', function(file) {
                var tinyFile = path.relative(process.cwd(), file.history[1]);
                fancyLog(chalk.green('成功压缩图片：' + tinyFile))
            })
            .on('end', function() {
                if (!tinypic.keep) del('dist/images/*')
            });
    }

    gulp.task('t', function() {
        tiny();
    });
}

module.exports = tinyImages;
