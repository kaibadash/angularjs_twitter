var gulp = require("gulp");
var tsc = require("gulp-tsc"); 
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');

var tspath = {
    "ts": ["ts/**/*.ts"]
};

gulp.task("build", function() {
    gulp.src(tspath.ts)
	.pipe(plumber())
        .pipe(tsc({sourcemap: true, out: "twitter.js", target:"ES5"}))
        .pipe(gulp.dest("js"));
});

gulp.task("watch", function() {
    gulp.watch(tspath.ts, ["build"]);
});

gulp.task('webserver', function() {
  gulp.src(".")
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task("default", ["build", "watch"]);

