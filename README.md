# windows下使用gulp压缩js，并合并js

gulp官网快速开始指引 https://gulpjs.com/docs/en/getting-started/quick-start

### 1.需要安装好 nodejs 
nodejs官网 https://nodejs.org/zh-cn/
进入命令行工具：“以管理员身份运行”windows下的CMD 或PowerShell，否则后面步骤安装时有可能出现没有权限的错误

### 2.安装gulp-cli命令行工具
```shell
npm install --global gulp-cli
```

### 3.新建项目文件夹 
```shell
npx mkdirp my-project
```
*这一步可以忽略，mkdirp 与mkdir -p相同作用，-p 意思是新建文件夹如果已存在，但不需要报错

### 4.进入项目文件夹
```shell
cd my-project
```

### 5.npm init
会自动生成 package.json，这是个重要的项目配置文件，不管用vue、react还是webpack都会有

### 6.安装gulp
```shell
npm install --save-dev gulp 
```
*--save-dev的意思是安装在项目文件夹内，而不是全局

### 7.新建一个文件 gulpfile.js 如下

```JavaScript
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
```
### 8.安装用到的gulp插件
```shell
npm install --save-dev gulp-concat
npm install --save-dev gulp-uglify
npm install --save readable-stream
npm install --save gulp-rename
```

### 9.运行压缩和合并命令
```shell
gulp minjs
gulp concatjs
```
