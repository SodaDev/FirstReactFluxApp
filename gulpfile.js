'use strict';

var gulp = require('gulp');
var gulpConnect = require('gulp-connect');      //run local web server
var gulpOpen = require('gulp-open');            //open url in a web browser
var browserify = require('browserify');         //Bundles JS
var reactify = require('reactify');             //Transforms React JSX to JS
var source = require('vinyl-source-stream');    //Use text streams with Gulp
var concat = require('gulp-concat');            //Concatenates files
var lint = require('gulp-eslint');              //Lint JS files, including JSX
var os = require('os');

var config = {
    port: 3000,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/img/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJS: './src/main.js'
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
            app: pickChrome(),
            uri: config.devBaseUrl + ":" + config.port + '/'
        }));
});

gulp.task('html', function(){
   gulp.src(config.paths.html)
       .pipe(gulp.dest(config.paths.dist))
       .pipe(gulpConnect.reload());
});

gulp.task('js', function(){
    browserify(config.paths.mainJS)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(gulpConnect.reload());
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/img'))
        .pipe(gulpConnect.reload());

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
               .pipe(lint({
                   config: 'eslint.config.json'
               }))
               .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);


//UTILS
function pickChrome() {
    return os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
}