'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var brfs = require('brfs');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var lodash = require('lodash');
var path = require('path');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var customOpts = {
  entries: ['./src/index.es6'],
  extensions: ['.es6'],
  debug: true
};

var babelOpts = {
  extensions: ['.es6'],
  presets: ['es2015', 'stage-0'],
  plugins: ['syntax-async-functions', 'transform-regenerator'],
  sourceMapRelative: path.resolve(__dirname, 'src')
};

var opts = lodash.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts))

b.transform(babelify.configure(babelOpts));
b.transform('brfs');

gulp.task('watch', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('dirtnap.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./bin'));
}
