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
In this post I’ll go through the basics setup of how I built this blog using the awesome 11ty (and hopefully show why I fell in love with it so much!)

### The setup
The first thing I did was to setup the folder structure. I did not strive away from the recommended 11ty structure, except for the build directory (more on that later!):

```
Last login: Sat Feb 27 19:03:07 on ttys002
🛰  j antodev                                                               ~
/Users/antopiras/code/antodev
🛰  tree -d -I 'node_modules|_site'                      code/antodev main 🐸
.
└── src
    ├── _includes
    │   └── layouts
    │       └── partials
    ├── admin
    ├── blog
    ├── css
    └── images
        ├── favicon
        └── uploads

10 directories
```

