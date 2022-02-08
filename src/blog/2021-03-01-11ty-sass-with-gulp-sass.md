---
layout: layouts/post.njk
title: I like my eleventy with a side of SCSS
description: I haven't had an easy time setting up a SASS preprocessor,
    autoprefixer and minifier in my 11ty blog so I wanted to write a short guide
    on how I managed to do it.
date: 2021-03-01T07:24:45.044Z
metaDescription: How to setup a SASS preprocessor, autoprefixer and minifier for
    eleventy with Gulp.
metaImage: ''
metaKeywords:
    - eleventy
    - 11ty
    - sass
    - scss
    - gulp
    - web
    - developer
    - javascript
    - js
    - code
    - coding
tags:
    - 11ty
    - tips
    - javascript
---

If you're like me and you cannot stand writing CSS without SASS and you want to enable it for your eleventy site, this is the right place for you.

Coming from the React world I immediately thought of **gulp** when I decided to include sass in my project, so I jumped at the possibility of using **gulp tasks** to compile SCSS and add vendor prefixes automatically (I hate them and I google [What CSS to prefix?](http://shouldiprefix.com/){rel="noopener noreferrer" target="\_blank"} almost every day).

Since we're writing gulp tasks I thought a minified CSS would also be a good idea.
So, if you're interested in how I did it, let's begin 💪🏻

## What is Gulp?

Gulp is a tool that lets us automate the trivial tasks that frontend web development usually requires like spinning up servers, processing SCSS and optimizing assets like images or even scripts. It also provides hot reloading when developing.

## Setting things up

The first thing I did was add the required packages, to my site's directory:

```
yarn add gulp gulp-autoprefixer gulp-cssnanno gulp-sass
```

## Gulp tasks

To use gulp we need to set up three tasks.

1. a "css" task to

-   compile our SCSS files to CSS
-   add vendor prefixes when required
-   minify the code

2. "watch" and "build" tasks to trigger the original "css" task when editing files (watch) or building the site (build).

A gulp task is just a function that gets a name assigned and can be called by Gulp to edit our files.

```js
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

gulp.task('css', function () {
    return gulp
        .src('./src/css/style.scss') //source file to retrieve
        .pipe(sass()) //sends the source file to the sass plugin
        .pipe(autoprefixer()) //sends the source file to the autoprefixer plugin
        .pipe(cssnano()) //sends the source file to the minifier plugin
        .on('error', sass.logError) //log errors
        .pipe(gulp.dest('./_site/css')) //outputs the result in our public dir
})

gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))
```

The `watch` and `build` tasks call `gulp.parallel()` to nest the previous task inside them.

These tasks can be called from the terminal via `gulp watch` or `gulp build`.

## Run gulp automatically

We don't want to have to run those commands every time we edit our SCSS files, of course. To automate this, we need to add these tasks to our `package.json` file:

```js
"scripts": {
 "serve": "gulp build & gulp watch & eleventy --serve",
 "build": "gulp build && yarn eleventy"
}
```

Now, whenever we run one of those two yarn scripts, our gulp tasks will be called before eleventy can parse our site.

## Do not be like me...

...and read the eleventy documentation!

When setting up all of this I was stomped for a solid hour trying to figure out why changes to my SCSS files weren't causing the browser to reload.
As it turns out, eleventy does not automatically watch any file in our project's directory, but we can make it do so, by adding this line to our `.eleventj.js` file:

```
eleventyConfig.addWatchTarget('src/css/')
```

Note that eleventy will not add a watch for files or folders that are in .gitignore.
To change that behaviour we need to add another line to `.eleventy.js`:

```
eleventyConfig.setUseGitIgnore(false)
```

...that's it. Now you should have everything you need to compile .scss files! 🚀
