var gulp = require('gulp');
var ts = require('gulp-typescript');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// define tasks here
gulp.task('default', function(){
  // run tasks here
  // set up watch handlers here
});

gulp.task('build', function () {
	runSequence('template:cache', 'typescript');
})

gulp.task('typescript', function () {
	return gulp.src('src/ts/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'angular.bootstrap.feedback.output.js'
		}))
		.pipe(gulp.dest('src/lib'));
});

gulp.task('template:cache', function () {
  return gulp.src('src/views/**/*.html')
    .pipe(templateCache({
			module: 'angular.bootstrap.feedback',
			filename: 'angular.bootstrap.feedback.templates.js'
		}))
    .pipe(gulp.dest('src/lib'));
});

gulp.task('typescript:watch', ['build'], browserSync.reload);

gulp.task('browsersync:serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/**/*.ts", ['typescript:watch']);
});
