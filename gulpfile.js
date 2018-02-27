'use strict';

const gulp = require('gulp'),
	  watch = require('gulp-watch'),
	  prefixer = require('gulp-autoprefixer'),
	  uglify = require('gulp-uglify'),
	  sass = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  rigger = require('gulp-rigger'),
	  cssmin = require('gulp-minify-css'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  rimraf = require('rimraf'),
	  browserSync = require("browser-sync"),
	  reload = browserSync.reload;

const path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/',
		lib: 'build/libs',
		myAjax: 'build/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

const config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 3000,
	logPrefix: "Poladashvili"
};
// Html
gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});
// JavaScript
gulp.task('js', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		//.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});
// Styles
gulp.task('style', function () {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		//.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});
// Images
gulp.task('image', function () {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});
// Fonts
gulp.task('fonts', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});
// Build
gulp.task('build', [
	'html',
	'js',
	'style',
	'image',
	'fonts',
	'libs',
	'my-ajax'
]);
// Watch
gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
		gulp.start('html');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts');
	});
});

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch', 'libs']);

gulp.task('libs', function () {
	gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.css',
		'node_modules/moment/min/moment-with-locales.min.js',
		'node_modules/jquery/dist/jquery.min.js'
		])
		.pipe(gulp.dest(path.build.lib))
});

gulp.task('my-ajax', function () {
	gulp.src(['src/js/ajax.json'])
		.pipe(gulp.dest(path.build.myAjax))
});