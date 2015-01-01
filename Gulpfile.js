'use strict';

var bump        = require('gulp-bump'),
    cssmin      = require('gulp-cssmin'),
    jshint      = require('gulp-jshint'),
    less        = require('gulp-less'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    path        = require('path'),
    rename      = require('gulp-rename');


var DIST_DIR = {
    js: this.app + 'dist/js',
    styles: this.app + 'dist/assets/styles'
};

var DEV_DIR = {
    js: 'app/js',
    styles: 'app/assets/styles'
};

gulp.task('compile', function () {
    gulp.src(DEV_DIR.styles + '/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(DEV_DIR.styles));
});

/*gulp.task('compile:dist', function () {
    gulp.src(DEV_DIR + '/styles/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DEV_DIR + '/styles/'));
});*/
