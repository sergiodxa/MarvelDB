var babelify   = require('babelify');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var cssnext    = require('gulp-cssnext');
var eslint     = require('gulp-eslint');
var gulp       = require('gulp');
var minifyHTML = require('gulp-minify-html');
var rename     = require('gulp-rename');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

var config = {
  babelify: {
    optional: [
      'es7.asyncFunctions',
      'es7.functionBind',
      'es7.objectRestSpread',
      'es7.trailingFunctionCommas',
      'runtime'
    ]
  },
  browserify: {
    fileName: 'app.js',
    extensions: ['.jsx']
  },
  cssnext: {
    compress: true
  }
}

var paths = {
  src: {
    eslint: './source/es6/**/*.jsx',
    js    : './source/es6/app.jsx',
    css   : './source/css/main.css',
    html  : './source/html/**/*.html'
  },
  build: {
    js    : './assets/js/',
    css   : './assets/css/',
    html  : './'
  }
}

gulp.task('build:js', function () {
  return browserify({
    entries: paths.src.js,
    debug: false,
    extensions: config.browserify.extensions,
    transform: [babelify.configure(config.babelify)]
  }).bundle()
    .pipe(source(config.browserify.fileName))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
});

gulp.task('build:css', function () {
  gulp.src(paths.src.css)
    .pipe(cssnext(config.cssnext))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.build.css))
});

gulp.task('build:html', function () {
  gulp.src(paths.src.html)
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.build.html))
});

gulp.task('watch', function () {
  gulp.watch([paths.src.eslint], ['build:js']);
  gulp.watch([paths.src.css], ['build:css'])
  gulp.watch([paths.src.html], ['build:html', 'build:css']);
});

gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('default', ['build']);
