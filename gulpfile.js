var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var webReload 	= browserSync.reload;

gulp.task('build', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('build/css/'))
});

gulp.task('serve', function() {
    browserSync({
      port: "3010",
      ui: {
        port: "3011"
      },
      notify: false,
      server:{
            baseDir: "./build/"
        }
  });
});

gulp.task('watch', ['serve', 'build'], function (){
  gulp.watch('app/scss/*.scss', ['build']);
  // Reloads the browser whenever HTML or CSS files change
  gulp.watch('app/scss/*.scss', webReload);
});

/* this will initially initiate all task one by one*/
gulp.task('default', function (callback) {
  runSequence(['watch','serve'],
    callback
  )
});