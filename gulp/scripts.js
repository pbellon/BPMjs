'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(paths.src + '/**/*.js')
    .pipe($.jshint())
    .pipe($.babel({modules: 'umd'}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(''))
    .pipe($.size());
});
