const gulp = require ('gulp');
const concat = require ('gulp-concat');
const browserSync = require ('browser-sync').create();
const del = require ('del');

const cssFiles = [
    './src/css/style.less',
    './src/css/all.less',
    './src/css/styled2.less',
    './src/css/styled3.less',
    './src/css/styled4.less',
]

function styles () {
    return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function clean() {
    return del(['./build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/*.css', styles).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);

}

gulp.task ('styles', styles);
gulp.task ('del', clean);
gulp.task ('watch', watch);
gulp.task ('build', gulp.series(clean, styles));
gulp.task ('dev', gulp.series("build", "watch"));