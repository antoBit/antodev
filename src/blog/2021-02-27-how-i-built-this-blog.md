---
layout: layouts/post.njk
title: How I built this blog
description: A journey through the setup of an 11ty static blog, from a
  developer, for everyone.
date: 2021-02-27T18:11:12.645Z
metaDescription: A journey through the setup of an 11ty static blog, from a
  developer, for everyone.
metaImage: /images/uploads/blog-tree.png
metaKeywords:
  - 11ty
  - blog
  - guide web
  - developer
  - javascript
  - js
  - code
  - coding
tags:
  - 11ty
  - tutorial
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