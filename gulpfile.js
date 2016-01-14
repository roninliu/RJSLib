"use strict";
var gulp = require("gulp"); //导入gulp
var jshint = require("gulp-jshint"); //js检查
var stylish = require('jshint-stylish'); //js检查格式化
var concat = require('gulp-concat'); //文件合并
var uglify = require('gulp-uglify'); //js压缩混淆
var del = require('del'); //删除文件

gulp.task("clear", function() {
	del.sync('build');
});
// 默认任务
gulp.task("default", ["clear"], function() {
	return gulp.src("./src/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});