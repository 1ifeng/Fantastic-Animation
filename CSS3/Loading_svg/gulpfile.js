var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

gulp.task('css', function() {
  return gulp.src('./src/*.scss')
    .pipe(compass({
      project: path.join(__dirname),
      css: 'dist',
      sass: 'src'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/'))
})

gulp.task('auto', function() {
  gulp.watch('./src/*.scss', ['css']);
})

gulp.task('default', ['css', 'auto'])
