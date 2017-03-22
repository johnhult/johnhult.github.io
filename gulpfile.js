// npm install gulp gulp-sass gulp-autoprefixer gulp-clean-css gulp-rename express connect-livereload tiny-lr es6-promise --save-dev

// Fix for autoprefixer
require('es6-promise').polyfill();

// Adding packages
//==================================================
var   gulp                      = require('gulp'),
      sass                      = require('gulp-sass'),
      autoprefixer              = require('gulp-autoprefixer'),
      minifycss                 = require('gulp-clean-css'),
      rename                    = require('gulp-rename'),
      browserify                = require('browserify'),
      source                    = require('vinyl-source-stream'),
      historyApiFallback        = require('connect-history-api-fallback')


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
  app.use(historyApiFallback());
  app.use(require('connect-livereload')({port: 4001}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

// Live-reload
var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4001);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log(event.path.substr(event.path.lastIndexOf("/"), event.path.length) + ' changed. Reloading.');


  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Minify and compile SASS to css
gulp.task('styles', function() {
  return gulp.src('css/main.scss')
  .pipe(sass())
  .on('error', function(err){
    console.error('Error!', err.message);
  })
  .pipe(autoprefixer())
  .pipe(gulp.dest('build/css/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('build/css/'));
});

// Take all npm modules I need and make them available in project
gulp.task('bundlemods', function() {
  var bundleMods = browserify('./js/modules.js')
  .bundle()
  .on('error', console.error)
  .pipe(source('modules.js'))
  .pipe(gulp.dest('./build/js'));
});

//Watch
gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('partials/*.html', notifyLiveReload);
  gulp.watch('js/*.js', notifyLiveReload);
  gulp.watch('js/**/*.js', notifyLiveReload);
  gulp.watch('build/css/*.css', notifyLiveReload);
});


// Run all
//=============================================================================
gulp.task('default', ['express', 'styles', 'livereload', 'watch'], function() {});