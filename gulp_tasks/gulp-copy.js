var gulp = require('gulp'),
	newer = require('gulp-newer'),
	gulpif = require('gulp-if');

gulp.task('copyMain', function () {
	gulp.src([
			'./src/index.html',
			'./src/favicon.ico'
		])
	.pipe(gulp.dest('./dist/'));
	gulp.src([
			'./src/assets/fonts/**/*'
		])
	.pipe(gulp.dest('./dist/assets/fonts/'));
	gulp.src([
			'./src/assets/img/**/*.*'
		])
	.pipe(gulp.dest('./dist/assets/img/'));
	gulp.src([
			'./src/assets/data/**/*.*'
		])
	.pipe(gulp.dest('./dist/assets/data/'));
});

gulp.task('copyAll', ['copyMain']);