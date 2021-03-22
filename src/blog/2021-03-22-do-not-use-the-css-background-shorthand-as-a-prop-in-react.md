---
layout: layouts/post.njk
title: Do not use the CSS background shorthand as a prop in React
description: Do not use the CSS background shorthand as a prop in React
date: 2021-03-22T18:07:16.129Z
metaDescription: Do not use the CSS background shorthand as a prop in React
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
I recently came across this bug at work and it took me a minute to figure it out, thanks to this [closed issue on React's Github](https://github.com/facebook/react/issues/5030).\
What I had was something like this:

```js
<div
    className="image-container"
    style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        background: `transparent url(${image_url}) no-repeat center center`,
        backgroundSize: 'contain'
   }}
/>
```

Apparently, using the CSS \`background\` shorthand property with a `backgroundSize` prop causes this last property to be cleared if and when the \`background\` property is updated.

A quick and easy fix is to explicitly set every property by expanding the shorthand property:

```js
<div
    className="image-container"
    style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        backgroundColor: 'transparent',
        backgroundImage: `url(${image_url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain'
   }}
/>
```