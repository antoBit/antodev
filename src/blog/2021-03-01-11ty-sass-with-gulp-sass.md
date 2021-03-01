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
I didn't have an easy time setting up a SASS preprocessor, autoprefixed and minifier in my 11ty blog so I wanted to write a short guide on how I managed to do it.

    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-cssnano": "^2.1.3",
    "gulp-sass": "^4.1.0",