var source = require('vinyl-source-stream'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	watchify = require('watchify'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	buffer = require('vinyl-buffer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var handleErrors = function() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

global.buildScript = function(file, watch) {
	var props = {
		entries: ['./src/assets/js/' + file],
		debug : true,
		transform:  [babelify.configure({stage : 0 })]
	};

	// watchify() if watch requested, otherwise run browserify() once
	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulp.dest('./dist/assets/js/'))
			// If you also want to uglify it
			// .pipe(buffer())
			// .pipe(uglify())
			// .pipe(rename('app.min.js'))
			// .pipe(gulp.dest('./dist'))
			.pipe(reload({stream:true}))
	}

	// listen for an update and run rebundle
	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle...');
	});

	// run it once the first time buildScript is called
	return rebundle();
}

gulp.task('scripts', function() {
	return global.buildScript('main.js', false); // this will once run once because we set watch to false
});