---
layout: layouts/post.njk
title: 11ty SASS with gulp-sass
description: 11ty SASS with gulp-sass
date: 2021-03-01T07:24:45.044Z
metaDescription: 11ty SASS with gulp-sass
metaImage: /images/uploads/terminal.png
metaKeywords:
  - web
  - developer
  - javascript
  - js
  - code
  - coding
tags:
  - notes
---
I didn't have an easy time setting up a SASS preprocessor, autoprefixer and minifier in my 11ty blog so I wanted to write a short guide on how I managed to do it.
The first thing I did was adding the required packages, in my site's directory:

```
yarn add --dev gulp gulp-autoprefixer gulp-cssnanno gulp-sasss
# the --dev argument is not required
```

To use gulp we need to set up three tasks:
1. a "css" task to
 - compile our scss files to css
 - add vendor prefixes when required
 - minify the code
2. "watch" "build" tasks to trigger the original "css" task when editing files (watch) or building the site (build).

```js
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

gulp.task('css', function () {
    return gulp
        .src('./src/css/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .on('error', sass.logError)
        .pipe(gulp.dest('./_site/css'))
})

gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))
```

