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

```js{r, attr.source='.numberLines'}
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

These tasks can be called from the terminal via `gulp watch` or `gulp build`.
To automate things, we need to add these tasks to our `
package.json` file:

```js
  "scripts": {
    "serve": "gulp build & gulp watch & eleventy --serve",
    "build": "gulp build && yarn eleventy"
  }
```

To tell 11ty to watch for changes to the css folder we need to add this code to `.eleventj.js`:

```js
eleventyConfig.addWatchTarget('src/css/')
``

Note that eleventy will not add a watch for files or folders that are in .gitignore.
To change that behaviour we need to add another line to `.eleventy.js`:

```js
eleventyConfig.setUseGitIgnore(false)
``

