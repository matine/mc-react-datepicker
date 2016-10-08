var gulp = require('gulp'),
	newer = require('gulp-newer'),
	gulpif = require('gulp-if');

gulp.task('copyMain', function () {
	gulp.src([
			'./src/index.html'
		])
	.pipe(gulp.dest('./dist/'));

	gulp.src([
			'./src/assets/scss/components/*.scss'
		])
	.pipe(gulp.dest('./dist/assets/styles/components/'));
});

gulp.task('copyAll', ['copyMain']);
