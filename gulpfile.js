var fs = require('fs-extra');
var gulp = require('gulp');
var path = require('path');
var nopt = require('nopt');
var webserver = require('gulp-webserver');
var log = console['log'];

gulp.task('default', function() {
  log('Usage:');
  log(' gulp clean: clean all temporary files');
  log(' gulp debug [--port=<number>]: start debug server (default port 8000)');
  log(' gulp export: export the demo to dist');
});

gulp.task('copy_dependencies', function() {
  var libDir = 'lib';
  if (!fs.existsSync('lib')) { fs.mkdirSync('lib'); }
  if (!fs.existsSync('lib/js')) { fs.mkdirSync('lib/js'); }
  if (!fs.existsSync('lib/css')) { fs.mkdirSync('lib/css'); }

  var jsFilesToCopy = [
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/ekko-lightbox/dist/ekko-lightbox.min.js',
    'bower_components/holderjs/holder.js',
    'bower_components/keen-js/dist/keen.js'
  ];

  var cssFilesToCopy = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/ekko-lightbox/dist/ekko-lightbox.min.css'
  ];

  var copy = function(file, dir) {
      fs.copySync(file, path.join(dir, path.basename(file)));
  };

    cssFilesToCopy.forEach(function(file) {copy(file, libDir + '/css')});
    jsFilesToCopy.forEach(function(file) {copy(file, libDir + '/js')});
});

gulp.task('clean', function() {
  var foldersToDelete = [
    'lib'
  ];

  foldersToDelete.forEach(function(folder) {
    if (fs.existsSync(folder)) {
      fs.removeSync(folder);
    }
  });
});

gulp.task('debug', ['copy_dependencies'], function() {
  var knownOps = {
    'port': [Number, null]
  };
  var portNumber = nopt(knownOps).port || 8000;

  gulp.src('.').pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: false,
    port: portNumber
  }));
});

gulp.task('export', ['copy_dependencies'], function() {
  var distDir = 'dist';

  if (!fs.existsSync(distDir)) { fs.mkdirSync(distDir); }
  fs.copySync('lib', path.join(distDir, 'lib'));

  var filesToCopy = [
    'index.html',
    'assets'
  ];

  var copyFile = function(file) {
    fs.copySync(file, path.join(distDir, path.basename(file)));
  };

  filesToCopy.forEach(copyFile);
});
