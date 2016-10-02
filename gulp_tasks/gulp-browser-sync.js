var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	historyApiFallback = require('connect-history-api-fallback');

gulp.task('browser-sync', function() {
	browserSync({
		// we need to disable clicks and forms for when we test multiple rooms
		server: {
			baseDir: './dist/'
		},
		middleware : [ historyApiFallback() ],
		ghostMode: false
	});
});
