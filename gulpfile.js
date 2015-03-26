// Adding packages
//==================================================
var 	gulp           = require('gulp'),
      sass           = require('gulp-ruby-sass'),
      autoprefixer   = require('gulp-autoprefixer'),
      minifycss      = require('gulp-minify-css'),
      rename         = require('gulp-rename');

// Paths
//===========================
var paths = { 
};

// Adding tasks
//=====================================================

// Server
gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

// Live-reload
var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Minify and compile SASS to css
gulp.task('styles', function() {
  return sass('stylesheets/main.scss')
  .on('error', function(err){
    console.error('Error!', err.message);
  })
  .pipe(autoprefixer())
  .pipe(gulp.dest('build/css/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('build/css/'));
});


//Watch
gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('build/css/*.css', notifyLiveReload);
});


// Run all
//=============================================================================
gulp.task('default', ['express', 'styles', 'express', 'livereload', 'watch'], function() {

});