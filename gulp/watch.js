'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', function () {
    gulp.watch([
        paths.src + '/**/*.js'
    ], ['scripts', 'test']);
    gulp.watch([
        paths.e2e + '/**/*.js'
    ], ['test']);
});
