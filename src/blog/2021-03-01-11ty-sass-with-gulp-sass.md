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
In this post, I’ll go through the basic setup of how I built this blog using the awesome 11ty (and hopefully show why I fell in love with it so much!).
I obviously won't cover everything in one post, I want to make a series of posts about the various parts of my process.

## Baby steps...

The first thing I did was create the blog directory:

```
mkdir antodev
cd antodev
```

After that, I added a `package.json` file via:

```
yarn init
# Pro tip: use yarn init -y to give all the default answers.
```

Then, it's just a matter of installing *eleventy*.

```
yarn add --dev @11ty/eleventy
```

Every site has an `index.html` file, so let's start there:

```
touch index.html
```

Put a basic HTML5 page inside it 💪🏻

## Let's run it

After this basic setup, I added two scripts to my `package.json` (this is just how I usually work, and I'll be editing these scripts later anyway):

```json
  "scripts": {
    "serve": "eleventy --serve",
    "build": "yarn eleventy"
  },
```

saved it and ran:

```
yarn build
yarn run v1.22.4
$ yarn eleventy
Writing _site/index.html from index.html
Wrote 1 file in ...
```

et voilà, inside the `_site` folder there's my new (and empty) blog.