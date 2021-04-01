---
layout: layouts/post.njk
title: Do not use the CSS background shorthand property in React
description: Why the CSS background shorthand property in React can cause
    problems if used with the backgroundSize property.
date: 2021-03-22T18:07:16.129Z
metaDescription: Why the CSS background shorthand property in React can cause
    problems if used with the backgroundSize property.
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

## The problem

I recently came across this bug at work and it took me a minute to figure it out.
What I had was something like this:

```javascript
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

Everything seems okay, right? Well, in theory.
But as soon as the application started, I noticed that the `backgroundSize` property was not working!

## Let’s get googling

After inspecting the output HTML and a bit of googling, I came across this [closed issue on React's Github](https://github.com/facebook/react/issues/5030){rel="noopener noreferrer" target="\_blank"}.

Apparently, using the CSS `background` shorthand property with a `backgroundSize` prop causes this last property to be cleared **if and when** the `background` property is updated.

## Fair enough, let’s fix it

A quick and easy fix is to explicitly set every property by expanding the shorthand property:

```javascript
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

That's all! I hope this is useful to you 💪🏻
