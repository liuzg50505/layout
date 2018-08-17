var gulp = require('gulp');
//var through = require("through-gulp");
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var paths = {
    pages: ['src/*.html']
};

gulp.task('build', function () {

    // return gulp.src('src/**/*.ts')
    //     .pipe(through(function (file, encoding, callback)
    //     {
    //         console.log("[ts2js] " + file.path);
    //         callback();
    //     }))
    //
    //     .pipe(sourcemaps.init())
    //     .pipe(ts({
    //         noImplicitAny: true,
    //         outFile: 'output.js'
    //     }))
    //     .pipe(sourcemaps.write())
    //     .pipe(gulp.dest('dist'));
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        // .pipe(through(function (file, encoding, callback)
        // {
        //     console.log("[ts2js] " + file.path);
        //     callback();
        // }))
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js',
            experimentalDecorators: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
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
