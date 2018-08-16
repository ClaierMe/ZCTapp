var gulp = require('gulp');
var css = require('gulp-mini-css');
var minify = require('gulp-minify');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint')
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');
var image = require('gulp-image');

// var root = process.cwd();

gulp.task('server', function () {
  connect.server({
    port: 8090,
    livereload: true
  });
});

gulp.task('livereload', function () {  
  gulp.src(['css/*.css', 'css/theme_colors/*.css', '*.html'])
    .pipe(connect.reload());
});

gulp.task("mini-js", function () {
  return gulp.src(['./js/*.js', './js/**/*.js', '*.js', '!gulpfile.js'])
    .pipe(minify({
      ext: {
        min: ".js",
        src: "-rog.js"
      }
    }))
    .pipe(gulp.dest("dist/js"))
})

gulp.task("mini-libs", function () {
  return gulp.src('./*libs/*.js')
    .pipe(minify({
      ext: {
        min: ".js",
        src: "-rog.js"
      }
    }))
    .pipe(gulp.dest("dist"))
})

gulp.task('mini-css', function () {
  gulp.src('css/*.css')
    .pipe(css())
    .pipe(gulp.dest("dist/css"))
  return
});

gulp.task('copy-html', function () {
  gulp.src(['*.html', './*views/*.html', './*views/*/*.html']) // 要压缩的html文件
    .pipe(htmlmin({
      collapseWhitespace: true
    })) //压缩
    .pipe(gulp.dest("dist"))
});

gulp.task('copy-img', function () {
  return gulp.src('img/**')
    .pipe(image({
      jpegRecompress: false,
      zopflipng: false
    }))
    .pipe(gulp.dest("dist/img"));
});

// gulp.task('copy-other', function () {
//   return gulp.src(["./*json/*.json", "./*icons/**/*.*"])
//     .pipe(gulp.dest("dist"));
// });

gulp.task('lint', function () {
  return gulp.src(['js/*.js', 'js/**/*.js', '!js/*min.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('clean', function () {
  return gulp.src(['dist/*'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['js/*.js', 'js/**/*.js'], ['lint']);
  gulp.watch(['css/*.css', '*.html', 'views/*.html'], ['livereload']);

});

gulp.task('default', ['lint', 'watch', "server"]);

gulp.task('build', ['mini-libs', 'mini-js', 'mini-css', 'copy-html', 'copy-img']);