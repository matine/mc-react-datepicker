var gulp = require('gulp'),
	newer = require('gulp-newer'),
	gulpif = require('gulp-if');

gulp.task('copyMain', function () {
	gulp.src([
			'./src/index.html'
		])
	.pipe(gulp.dest('./dist/'));
});

gulp.task('copyAll', ['copyMain']);