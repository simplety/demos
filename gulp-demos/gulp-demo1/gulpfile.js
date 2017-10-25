var gulp = require('gulp');

// api
//gulp.task(name, fn)，注册一个 gulp 任务
//gulp.run(...tasks)，并行运行多个 gulp 任务
//gulp.watch(glob, fn)，实时监控内容，当 glob 内容变化时，执行 fn
//gulp.src(glob)，glob 是目标文件的路径，返回一个可读的 stream
//gulp.dest(gloc)，glob 是输出路径，返回一个可写的 stream

const paths = {
  script: './src/js/*.js',
  css: './src/css/*.css',
  image: './src/img/*',
}

var del = require("del"),
    cssnano = require("gulp-cssnano"),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');

//注册一个清空dist文件夹的任务
gulp.task('clean',function(){
  return del(['dist/js','dist/css','dist/img']); //清空dist文件夹
});

//注册一个压缩图片的任务
gulp.task('imgmin',function(){
  return gulp.src(paths.image)
    // .pipe(imagemin({optimizationLevel:5}))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});
//注册一个css压缩合并的任务
gulp.task('css',function(){
  return gulp.src(paths.css)
    .pipe(concat('index-merge.css'))
    .pipe(cssnano())
    .pipe(rename({   //压缩后添加min后缀名
      suffix: ".min"
    }))
    .pipe(gulp.dest('dist/css'));
});

//注册一个js压缩合并的任务
gulp.task('script',function(){
  return gulp.src(paths.script)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat("index-merge.js"))
    .pipe(uglify())
    .pipe(rename({  //压缩后添加min后缀名
      suffix: ".min"
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',function(){
  gulp.watch(paths.script,['script']);
  gulp.watch(paths.css,['css']);
  gulp.watch(paths.img,['imgmin']);
});

gulp.task('default',['clean','watch','css','imgmin','script']);