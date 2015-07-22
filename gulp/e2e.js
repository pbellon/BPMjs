'use strict';

var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function(){
    return gulp.src( gulp.paths.e2e + '/**/*.js')
            .pipe(mocha());
});
