var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	combineMq = require('gulp-combine-mq'),
	browserSync = require('browser-sync'),
	gulpif = require('gulp-if'),
	minifyCss = require('gulp-minify-css');


var sassOptions = {
	quiet: true,
	includePaths: require('node-neat').includePaths,
	imagePath: '../img/',
	precision: 4,
	outputStyle: 'nested'
};

var autoprefixerOptions = {
	browsers: ['last 2 versions', 'ie 9']
};

gulp.task('sass', ['iconfont'], function () {
	return gulp.src('./src/assets/scss/**/*.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulpif(global.env === 'prod', combineMq()))
		.pipe(gulpif(global.env === 'prod', minifyCss()))
		.pipe(gulp.dest('./dist/assets/css/'));
		// .pipe(gulpif(global.waitingWatch === false, browserSync.stream()));
});
