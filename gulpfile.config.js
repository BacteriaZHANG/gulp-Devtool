var SRC_DIR = 'src/';
var SRC_ALL = 'src/**/*.*';
var DIST_DIR = 'dist/';
var DIST_IMAGES = 'dist/images';
var DIST_JS = 'dist/js';
var DIST_CSS = 'dist/css';
var DIST_FONT = 'dist/font';

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    distImages: DIST_IMAGES,
    distJs: DIST_JS,
    distCss: DIST_CSS,
    srcAll: SRC_ALL,
    html: {
        htmlSrc: SRC_DIR + 'page/**/*.html', // 所有html文件
        htmlSrcNo: SRC_DIR + 'page/公共组件预览/*.html', // 忽略公共预览html
        dist: DIST_DIR // 输出产品html
    },
    pug: {
        src: SRC_DIR + '**/*.pug',
        pugSrc: SRC_DIR + 'page/**/*.pug',
        pugDest: SRC_DIR + 'page'
    },
    css: {
        srcDist: SRC_DIR + 'css/*.css', // 组合css
        srcFile: SRC_DIR + 'css', // 组合css
        srcSingle: SRC_DIR + 'page/**/*.css',
        dist: DIST_CSS // 输出组合产品css
    },
    sass: {
        baseSingle: SRC_DIR + 'page/**/*.scss',
        baseSingleNo: SRC_DIR + 'page/公共组件预览/*.scss',
        baseSingleOut: SRC_DIR + 'page',
        baseSass: SRC_DIR + 'lib/sass/*.scss',
        src: SRC_DIR + '**/*.scss',
        srcMain: SRC_DIR + '*.scss' // 链接页面的主scss文件
    },
    js: {
        srcLib: SRC_DIR + 'lib/js/*.js', // 引入的各种插件js
        srcMain: SRC_DIR + 'main.js', // 页面内js
        dist: DIST_JS // 输出产品js
    },
    font: {
        srcLib: SRC_DIR + 'font/*.*', // 字体文件
        dist: DIST_FONT // 输出产品字体文件
    },
    img: {
        src: SRC_DIR + '**/images/*.{jpg,png,gif,jpeg}',
        src_images: SRC_DIR + 'images/*.{jpg,png,gif,jpeg}',
        page: SRC_DIR + 'page/*/images/*.{jpg,png,gif,jpeg}',
        images: SRC_DIR + 'images',
        dist: DIST_IMAGES // 输出产品images
    }
};

module.exports = Config;
