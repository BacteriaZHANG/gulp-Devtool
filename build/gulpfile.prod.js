var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var replace = require('gulp-replace');
var babel = require('gulp-babel');
var Config = require('../gulpfile.config.js');

function prod () {
    gulp.task('prod:pug', function () {
            return gulp.src(Config.pug.pugSrc)
            .pipe(pug())
            .pipe(htmlbeautify())
            .pipe(gulp.dest(Config.pug.pugDest));
    }); // pug模板转换
    gulp.task('prod:html', ['prod:pug'], function () {
        return gulp.src([Config.html.htmlSrc, '!' + Config.html.htmlSrcNo])
            .pipe(replace(/src=\"(\.\.\/){2,}lib\//g, 'src=\"'))
            .pipe(replace(/src=\"(\.\.\/){2,}main/g, 'src=\"js/main'))
            .pipe(replace(/src=\"(\.\.\/){2,}images\//g, 'src=\"images/'))
            .pipe(replace(/href=\"(\.\.\/){2,}/g, 'href=\"'))
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(Config.dist)); // 迁移html
    });
    gulp.task('prod:htmlSin', ['prod:pug'], function () {
        return gulp.src([Config.html.htmlSrc, '!' + Config.html.htmlSrcNo])
            .pipe(replace(/src=\"(\.\.\/){2,}lib\//g, 'src=\"'))
            .pipe(replace(/src=\"(\.\.\/){2,}main/g, 'src=\"js/main'))
            .pipe(replace(/src=\"(\.\.\/){2,}images\//g, 'src=\"images/'))
            .pipe(replace(/href=\"(\.\.\/){2,}/g, 'href=\"'))
            .pipe(replace(/href=\"(?=(\w|[\u4e00-\u9fa5]){1,}\.css)/g, 'href=\"css/'))
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(Config.dist)); // 迁移html
    });
    gulp.task('prod:css', function () {
        return gulp.src(Config.css.srcDist)
            .pipe(rename({dirname: ''}))
            .pipe(cleanCSS({
                advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepSpecialComments: '*',
                level:{ 1: {
                    optimizeFilter: false
                }}
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(gulp.dest(Config.css.dist)); // 压缩并迁移css
    });
    gulp.task('prod:cssSin', function () {
        return gulp.src(Config.css.srcSingle)
            .pipe(rename({dirname: ''}))
            .pipe(minifyCSS())
            .pipe(gulp.dest(Config.css.dist)); // 压缩并迁移css
    });
    gulp.task('prod:miniMainJs', function () {
        return gulp.src(Config.js.srcMain)
            .pipe(uglify({
                mangle: true,
                compress: true
            }))
            .pipe(gulp.dest(Config.js.dist)); // 合并、压缩、迁移main.js
    });
    gulp.task('prod:mainjs', function () {
        return gulp.src(Config.js.srcMain)
            .pipe(babel({
                presets: ['@babel/env']
            }))
            // .pipe(babel({
            //     plugins: ['@babel/transform-runtime']
            // }))
            // .pipe(webpack(require('../webpack.config.js')))
            .pipe(gulp.dest(Config.js.dist)); // 合并、迁移main.js
    });
    gulp.task('prod:font', function () {
        return gulp.src(Config.font.srcLib)
            .pipe(gulp.dest(Config.font.dist)); // 合并、压缩、迁移main.js
    });
    gulp.task('prod:libjs', function () {
        return gulp.src(Config.js.srcLib)
            .pipe(gulp.dest(Config.js.dist)); // 迁移所有引用的js库
    });
    gulp.task('prod:js', ['prod:libjs', 'prod:mainjs']);
    gulp.task('prod:minijs', ['prod:libjs', 'prod:miniMainJs']);
    gulp.task('clean-css', function () {
        return gulp.src(Config.css.srcFile)
            .pipe(cleanCSS({debug: true}, function (details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            })); // 清除旧css文件
    });
    gulp.task('prod:img', function () {
        return gulp.src(Config.img.src)
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(Config.img.dist)); // 迁移所有图片
    });
    gulp.task('changed:html', function () {
        return gulp.src(Config.html.htmlSrc)
            .pipe(rename({dirname: ''}))
            .pipe(replace(/src=\"..\/..\/lib\//g, 'src=\"'))
            .pipe(replace(/src=\"..\/..\/main/g, 'src=\"js/main'))
            .pipe(replace(/src=\"..\/..\/images\//g, 'src=\"images/'))
            .pipe(replace(/href=\"..\/..\//g, 'href=\"'))
            .pipe(changed(Config.html.htmlDist))
            .pipe(gulp.dest(Config.htmlDist));
    }); // 迁移更改过的html
    gulp.task('changed:scss', function () {
        return gulp.src(Config.css.srcFile)
            .pipe(rename({dirname: ''}))
            .pipe(changed(Config.css.cssDist))
            .pipe(gulp.dest(Config.cssDist));
    });
    gulp.task('p', ['prod:html', 'prod:font', 'prod:js', 'prod:css','clean-css','prod:img']);
    gulp.task('pmin', ['prod:html', 'prod:font', 'prod:minijs', 'clean-css', 'prod:css', 'prod:img']);
    gulp.task('ps', ['prod:htmlSin', 'prod:font', 'prod:minijs', 'clean-css', 'prod:css', 'prod:cssSin', 'prod:img']);
}

module.exports = prod;
