---
layout: layouts/post.njk
title: Don't use the CSS background shorthand property in React
description: Don't use the CSS background shorthand property in React
date: 2021-03-22T18:07:16.129Z
metaDescription: Why the CSS background shorthand property in React can cause
  problems if used with the backgroundSize property
metaKeywords:
  - web
  - developer
  - javascript
  - js
  - code
  - coding
  - react
  - css
  - inline
  - bug
  - background
  - shorthand
  - backgroundSize
tags:
  - react
  - javascript
  - css
  - tips
---
I recently came across this bug at work and it took me a minute to figure it out.
What I had was something like this:

```js
<div
    className="image-container"
    style={% raw %}{{{% endraw %}
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        background: `transparent url(${image_url}) no-repeat center center`,
        backgroundSize: 'contain'
   {% raw %}{{{% endraw %}
/>
```

After inspecting the output HTML and a bit of googling, I came across this [closed issue on React's Github](https://github.com/facebook/react/issues/5030).

Apparently, using the CSS `background` shorthand property with a `backgroundSize` prop causes this last property to be cleared **if and when** the `background` property is updated.

A quick and easy fix is to explicitly set every property by expanding the shorthand property:

```js
<div
    className="image-container"
    style={% raw %}{{{% endraw %}
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
   {% raw %}{{{% endraw %}
/>
```