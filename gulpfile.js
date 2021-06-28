// const { task } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

// Sass
gulp.task("sass", function(done) {
  return gulp.
  src(['./src/sass/**/*.scss', '!./src/sass/widget.scss'])
  // *.scss - all files at the end of the path
  // **/*.scss - match all files at the eind of the path plus all children fiels and folders
  // !*.scss or !**/*.scss - exclude the matching expressions
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path) {
      if ( !path.extname.endsWith('.map')) {
        path.basename += ".min"
      }
    }))
    .pipe(gulp.dest('./dist/css'));
  done();
});

// Less
gulp.task('less', function(done) {
  return gulp.
  src('./src/less/**/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(rename('./styles.min.css'))
  .pipe(gulp.dest('./dist/css'));
  done();
});

// Javascript
gulp.task('javascript', function(done) {
  return( gulp
    .src(['./src/js/alert.js', './src/js/project.js'])
    .pipe(concat('project.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
  )
  done();
})

// Watch Task with BrowserSync
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    browser: "firefox"
  })

  gulp.watch(
    [
      './src/sass/**/*.scss', 
      '**/*.html', 
      './src/less/**/*.less', 
      './src/js/**/*.js'
    ], 
    gulp.series(['sass', 'less', 'javascript']))
  .on('change', browserSync.reload);
});