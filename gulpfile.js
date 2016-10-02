var gulp = require('gulp');
var requireDir = require( 'require-dir' );

requireDir('gulp_tasks', { recurse: true } );

// Short tasks
gulp.task('set-env-dev', function() { global.env = 'dev' });
gulp.task('set-env-prod', function() { global.env = 'prod' });

// Global tasks
gulp.task('common', ['copyAll', 'sass', 'scripts'], function() {
	gulp.watch('./src/assets/scss/**/**/*', ['sass']); // gulp watch for scss changes
	return global.buildScript('main.js', true); // browserify watch for JS changes
});

gulp.task('dev', [
	'set-env-dev',
	'common',
	'browser-sync'
]);

gulp.task('build', [
	'set-env-prod',
	'common'
]);

gulp.task('default', ['dev']);
