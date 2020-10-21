const { src, dest } = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var pipeline = require('readable-stream').pipeline;

exports.minjs = function() {
    return pipeline(
        src('./assets/main.js'),
        uglify(),
        rename("main.min.js"),
        dest('./assets/')
    )
}

exports.concatjs = function() {
    return pipeline(
        src([
            './libs/pixi.min.js',
            './libs/gsap.min.js',
            './libs/PixiPlugin.min.js',
            './libs/hammer.min.js',
            './assets/main.min.js',
        ]),
        concat('all.min.js'),
        dest('./assets/')
    )
}