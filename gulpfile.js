var gulp = require('gulp');

//https://www.npmjs.com/package/gulp-less
var less = require('gulp-less');
//自动加上浏览器前缀
var lessPluginAutoPrefix = require('less-plugin-autoprefix');
//一个less，css的压缩插件
var lessPluginLeanCss = require('less-plugin-clean-css');

//https://www.npmjs.com/package/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');
//这个插件的livereload需要chrome浏览器加上一个插件
//var livereload = require('gulp-livereload');

//https://www.npmjs.com/package/gulp-connect
var connect = require('gulp-connect');

var port = 8080, islivereload = true;

gulp.task('httpServer',function(){
    connect.server({
        port: port,
        livereload: islivereload,
        root: './'
    });
});

function lessTask(src, destSrc) {
    return function(){
        var plugins = [],
            //browser参数参考：https://github.com/ai/browserslist#queries
            autoPrefix = new lessPluginAutoPrefix({browsers: ["Android > 2","iOS > 5"]}),
            cleancss = new lessPluginLeanCss({advanced:true});
        plugins.push(autoPrefix);
        return gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(less({plugins : plugins}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destSrc))
            .pipe(connect.reload());
    }
}

gulp.task("less-ta", lessTask('./tinyarrow/less/!*.less', './tinyarrow/'));
gulp.task('tinyarrow', function () {
    return gulp.watch('./tinyarrow/less/!*.less', ['less-ta']);
});var weChartLessPath = './wechart/less/!*.less';
gulp.task("less-wc", lessTask(weChartLessPath, './wechart'));
gulp.task('wechart', ['httpServer'], function () {
    return gulp.watch(weChartLessPath, ['less-wc']);
});






