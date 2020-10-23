const { src, dest } = require('gulp');
var spritesmith = require('gulp.spritesmith');

exports.sprite = function () {
  var spriteData = src('sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: "left-right"
  }));
  return spriteData.pipe(dest('sprite/'));
};