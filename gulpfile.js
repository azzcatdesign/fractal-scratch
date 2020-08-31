'use strict';

const gulp         = require('gulp');
const fractal      = require('./fractal.config.js');
const logger       = fractal.cli.console;
const sass         = require('gulp-sass');
const sassGlob     = require('gulp-sass-glob');
const plumber      = require('gulp-plumber');
const sourcemaps   = require('gulp-sourcemaps');
const svgstore     = require('gulp-svgstore');
const notify       = require('gulp-notify');
const path         = require('path');

sass.compiler = require('sass');

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/*.scss')
    .pipe(customPlumber('Error running Sass'))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'))
});

gulp.task('watch', function() {
  gulp.watch([
    'src/components/**/*.scss',
    'src/assets/scss/**/*.scss'
  ], gulp.series('svgstore', 'publicassets', 'sass'));
});

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
    })
  });
}

gulp.task('svgstore', function () {
  return gulp
    .src('src/assets/public/svg/**/*.svg')
    .pipe(svgstore())
    .pipe(gulp.dest('public/svg'));
});

gulp.task('publicassets', function() {
  return gulp.src('src/assets/public/**/*').pipe(gulp.dest('public'));
});

gulp.task('fractal:start', function(){
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('build', gulp.parallel('svgstore', 'publicassets', 'sass'));

gulp.task('default', gulp.parallel('svgstore', 'publicassets', 'fractal:start', 'sass', 'watch'));
