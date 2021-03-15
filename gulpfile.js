const gulp = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const minify = require('gulp-minify')

gulp.task('css', function () {
    return gulp
        .src('./src/css/style.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .on('error', sass.logError)
        .pipe(gulp.dest('./_site/css'))
})

gulp.task('min-js', function () {
    return gulp
        .src('./src/scripts/*.js')
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['-min.js'],
            })
        )
        .pipe(gulp.dest('./_site/scripts'))
})

gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', gulp.parallel('css'))
    gulp.watch('./src/scritps/*.js', gulp.parallel(['min-js']))
})

gulp.task('build', gulp.parallel('css', 'min-js'))
