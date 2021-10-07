//import
import gulp from "gulp";
import pug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import gimg from "gulp-image";
import atpx from "gulp-autoprefixer";
import csso from "gulp-csso";
import bro from "gulp-bro";
import babeli from "babelify";
const scss = require("gulp-sass")(require("node-sass"));
scss.compiler = require("node-sass");
const routes = {
  pug: {
    allpug: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
  scss: {
    src: "src/scss/style.scss",
    watch: "src/scss/**/*.scss",
    dest: "build/css",
  },
  js: {
    src: "src/js/main.js",
    watch: "src/js/**/*.js",
    dest: "build/js",
  },
};

// function
const gpug = () =>
  gulp.src(routes.pug.src).pipe(pug()).pipe(gulp.dest(routes.pug.dest));
const dell = () => del(["/home/newjohn/scssmaster/[object Object]"]);
const gwebserver = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
    })
  );
const img = () =>
  gulp.src(routes.img.src).pipe(gimg()).pipe(gulp.dest(routes.img.dest));

const css = () =>
  gulp
    .src(routes.scss.src)
    .pipe(scss().on("error", scss.logError))
    .pipe(atpx())
    .pipe(csso())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babeli.configure({
            presets: ["@babel/preset-env"],
          }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const watch = () => gulp.watch(routes.pug.allpug, gpug);
gulp.watch(routes.scss.watch, css);
gulp.watch(routes.js.watch, js);

// series
const p = gulp.series([gpug]);
const server = gulp.series([gwebserver]);
const watching = gulp.series([watch]);
const i = gulp.series([img]);
const sc = gulp.series([css]);
const delll = gulp.series([dell]);
const javaScript = gulp.series([js]);

// bundle series
const compileFile = gulp.series([p, i, javaScript, sc]);
const delBundle = gulp.series([delll]);
const openServerAndWatch = gulp.parallel([server, watching]);

// gulp task
export const dev = gulp.series([compileFile, delBundle, openServerAndWatch]);
