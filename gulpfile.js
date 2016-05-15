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
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var config = {
	paths: {
		dist: './dist',
		lib: './src/lib',
		tsconfig: './tsconfig.json'
	}
}

var pkg = require('./package.json');
var banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @author <%= pkg.author %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

gulp.task('clean', function () {
  return del([
		config.paths.dist + "/**/",
		config.paths.dist + "/**/",
		config.paths.lib + "/**/",
  ]);
});

gulp.task('styles', function() {
	gulp.src('./src/css/**.css')
	.pipe(csscomb())
	.pipe(header(banner, {pkg: pkg}))
	.pipe(rename({
		basename: pkg.name + "-styles"
	}))
	.pipe(gulp.dest(config.paths.dist))
	.pipe(minifyCSS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(header(banner, { pkg : pkg }))
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('typescript', function () {
	var tsConfig = ts.createProject(config.paths.tsconfig, {
		sortOutput: true,
		out: pkg.name + '-output.js'
	});

	return gulp.src('src/ts/**/*.ts')
	.pipe(ts(tsConfig))
	.pipe(gulp.dest('src/lib'));
});

gulp.task('copy', function () {
	return gulp.src('./src/lib/**.js')
	.pipe(concat(pkg.name + '.js'))
	.pipe(header(banner, {pkg: pkg}))
	.pipe(gulp.dest(config.paths.dist))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(uglify())
	.pipe(header(banner, { pkg : pkg }))
	.pipe(gulp.dest(config.paths.dist));
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
		filename: pkg.name + '-templates.js'
	}))
	.pipe(gulp.dest('src/lib'));
});

gulp.task('typescript:watch', ['build'], function () {
	browserSync.reload();
});

gulp.task('browsersync:serve', ['build'], function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch("src/**/*.ts", ['typescript:watch']);
});

// ======================================================== //
gulp.task('default', ['build'], function(){});

gulp.task('build', ['clean', 'template:cache', 'typescript', 'styles', 'copy']);
gulp.task('deploy', ['build']);
