var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/'))
})

gulp.task('auto', function() {
  gulp.watch('./src/*.scss', ['css']);
})

gulp.task('default', ['css', 'auto'])
