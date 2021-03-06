"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var concat = require("gulp-concat");

gulp.task("build-src", function() {
  return gulp.src('./src/img/*') // Выберем файлы по нужному пути
    .pipe(gulp.dest('./build/src/img')) // Выплюнем их в папку build/src/img
});

gulp.task("build-smartlid", function() {
  return gulp.src('./src/js/smartlid/**') // Выберем файлы по нужному пути
    .pipe(gulp.dest('./build/smartlid/')) // Выплюнем их в папку build/src/img
});

gulp.task("css", function () {
  return gulp.src("./src/_sass/style.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("./src/css/"))
    .pipe(server.stream());
});

gulp.task('css-concat', function() {
    return gulp.src(["./src/css/normalize.css", "./src/css/bootstrap-grid.css", "./src/css/*.css"])
        .pipe(concat("all.css"))
        .pipe(gulp.dest("./build/src/css/"));
});

gulp.task("scripts", function() {
  return gulp.src(["./src/js/jquery-3.3.1.min.js", "./src/js/jquery.fancybox.min.js", "./src/js/*.js"])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./build/src/js/"));
});

gulp.task("build-html", function() {
  return gulp.src('./src/html/*') // Выберем файлы по нужному пути
    .pipe(gulp.dest('./build/')) // Выплюнем их в папку build
});


gulp.task("server", function () {
  server.init({
    server: {
      baseDir: "build"
    },
    notify: false,
    baseDir: "build",
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/img/*", gulp.series("build-src"));
  gulp.watch("*src/js/*.js", gulp.series("scripts"));
  gulp.watch("*src/_sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("*src/css/*.css", gulp.series("css-concat"));
  gulp.watch("*build/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("build-src", "build-smartlid", "css", "css-concat", "scripts", "build-html", "server"));
