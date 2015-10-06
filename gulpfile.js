var express = require('express');
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('test', function() {
	express()
		.use('/', express.static('./'))
		.listen(6969);

	#todo: Windows? Should work on most linux distros.
	exec('open http://localhost:6969/build/', function (stdOut, stdErr) {

	});
});
