/**
 * Created by Kateryna_Porkhun on 10/16/2015.
 */
var gulp = require('gulp'),
		del = require('del'),
		stylus = require('gulp-stylus'),
		autoprefixer = require('gulp-autoprefixer');


gulp.task('stylus', function() {
	return gulp
			.src('./styl/*.styl')
			.pipe( stylus() )
			.pipe(autoprefixer({
				browsers: ['last 5 versions'],
				cascade: true
			}))
			.pipe( gulp.dest('./css') );
});

// Clean
gulp.task('clean', function(cb) {
	del(['./css/*.css'], cb)
});



// Watch
gulp.task('watch', function() {
// Watch .scss files
	gulp.watch('./styl/*.styl', ['stylus']);
});

// Default task
gulp.task('default', function() {
	gulp.start('clean', ['stylus', 'watch']);
});