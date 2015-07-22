'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('default', function () {
    gulp.start('watch');
});
