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
  - code
---
## A journey in N parts (I don’t know yet)

In this post, I’ll go through the basic setup of how I built this blog using the awesome 11ty (and hopefully show why I fell in love with it so much!)

## Folder structure

The first thing I did was setting up the folder structure. I did not strive away from the recommended 11ty structure, except for the build directory (more on that later!):

\## Baby steps...

The first thing I did was create the blog directory:

```
mkdir antodev
cd antodev
```

After that, I added a `package.json` file via:

```
yarn init
```

**Pro tip:** use `yarn init -y` to give all the default answers.

Then, it's just a matter of installing *eleventy*.

```
yarn add --dev @11ty
```

![The blog folder structure](/images/uploads/blog-tree.png "The blog folder structure")