var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');
var merge = require('event-stream').merge;
var del = require('del');
var paths = {
    pages: ['src/*.html']
};

gulp.task('build', function (cb) {

    var tmptscompile = "dist/tmpoutts.js";
    var jslibfiles = "libs/**/*.js";

    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target:"es5",
            experimentalDecorators: true,
            outFile: tmptscompile,
            sourcemap:true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("."))
        .on('end',function () {
            gulp.src([tmptscompile,jslibfiles])
                .pipe(concat("output.js"))
                .pipe(gulp.dest('dist'))
                .pipe(uglify())
                .pipe(rename('output.min.js'))
                .pipe(gulp.dest('dist'))
                .on("end",function (cb) {
                    del([tmptscompile]);
                });
        });

});


gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'] ,function () {
    gulp.watch('./src/**/*.ts',['build','copyHtml']);
    gulp.watch('./tsconfig.json',['build','copyHtml']);
});


// gulp.task('default', ['copyHtml'], function () {
//     return browserify({
//         basedir: '.',
//         debug: true,
//         entries: ['src/layout4.ts'],
//         cache: {},
//         packageCache: {}
//     })
//
//         .plugin(tsify)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('dist'));
// });
