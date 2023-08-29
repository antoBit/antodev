const gulp = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

gulp.task('css', function () {
    return gulp
        .src('./src/css/style.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('./_site/css'))
})

gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))
