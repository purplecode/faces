var gulp = require('gulp');
var fs = require('fs');
var gulpPlugins = require('gulp-load-plugins')();

var sources = {
  less: 'public/app/**/*.less',
  html: 'public/app/**/*.html',
  jade: 'public/**/*.jade',
  js: {
    frontend: 'public/app/**/*.js'
  }
};

gulp.task('less', function () {
  return gulp.src([sources.less])
      .pipe(gulpPlugins.plumber())
      .pipe(gulpPlugins.less({compress: true}))
      .pipe(gulp.dest('public/app/'));
});

gulp.task('less:watch', ['less'], function () {
  gulp.watch([sources.less], ['less']);
});

gulp.task('createBundle', ['less'],
    gulpPlugins.shell.task([
      'jspm bundle-sfx app/app public/app-prod.js'
    ])
);