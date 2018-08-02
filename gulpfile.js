var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

var paths = {
    pages: ['src/*.html']
};

gulp.task('build', function () {
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});


gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    gulp.watch('./src/*.ts',['build','copyHtml']);
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
