'use strict';

var gulp = require('gulp');
var gulpConnect = require('gulp-connect'); //run local web server
var gulpOpen = require('gulp-open');       //open url in a web browser

var config = {
    port: 3000,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        dist: './dist'
    }
};

//Start a local dev server
gulp.task('connect', function(){
   gulpConnect.server({
       root: ['dist'],
       port: config.port,
       base: config.devBaseUrl,
       livereload: true
   })
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(gulpOpen({
            uri: config.devBaseUrl + ":" + config.port + '/'
        }));
});

gulp.task('html', function(){
   gulp.src(config.paths.html)
       .pipe(gulp.dest(config.paths.dist))
       .pipe(gulpConnect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);