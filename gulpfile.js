var gulp = require('gulp');
var ts = require('gulp-typescript');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var minifyHtml = require("gulp-minify-html");
var csscomb = require('gulp-csscomb');
var header = require('gulp-header');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

var pkg = require('./package.json');
var banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @author <%= pkg.author %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

// define tasks here
gulp.task('default', function(){
	// run tasks here
	// set up watch handlers here
});

gulp.task('build', function () {
	runSequence('template:cache', 'typescript');
})

gulp.task('styles', function() {
	gulp.src('./src/css/**.css')
	.pipe(csscomb())
	.pipe(header(banner, {pkg: pkg}))
	.pipe(rename({
		basename: pkg.name + ".styles"
	}))
	.pipe(gulp.dest('dist'))
	.pipe(minifyCSS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(header(banner, { pkg : pkg }))
	.pipe(gulp.dest('dist'));
});

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
	.pipe(minifyHtml({
		empty: true,
		spare: true,
		quotes: true
	}))
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
