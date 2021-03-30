---
layout: layouts/post.njk
title: useCallback? I don't know her.
description: Should you wrap every single function in useCallback? Or should you
  go for code readability and hope for the best? Well, it depends.
date: 2021-03-30T11:26:29.725Z
metaDescription: A small journey into the world of React memoization and when to
  use (or not!) useCallback and useMemo.
metaImage: /images/uploads/the_general_problem.png
metaKeywords:
  - web
  - developer
  - javascript
  - js
  - code
  - coding
  - optimization
  - useCallback
  - useMemo
  - React
tags:
  - react
  - js
  - optimisation
  - developer
  - coding
---
Spoiler alert: this is a rant that *might turn into something useful*. Maybe.

## I don’t know React

My React journey has been a constant learning experience, but there’s something about React that has been bugging me lately.

Ever since I changed company last year, I found myself in a new codebase, and with it came something I never saw before: an *odd quantity* of useCallback in every single component of the app.

I have to admit I was responsible for most of a medium/big react app at my previous company and it always ran smoothly even without this heavy optimization. 
Of course, thanks to my beloved impostor syndrome I immediately thought “Oh god, I’m a terrible developer, I don’t know React, I never use memoization”. You know, the usual. 

## PR Review anxiety

Since I was not familiar with the concept of useCallback, useMemo (and loads `memoize`!) 

I immediately documented myself, but all I could find were articles and tutorials about how to use these hooks and functions, and none of them touched deeply on the dependency array, which is something I constantly screw up!

Lately, I’ve been reading a lot on the use of `useCallback` and `useMemo` in a React app (useful links at the end of the post ✏️) because I wasn’t comfortable with my *fake it ‘till you make it* approach to this part of the framework and what I read was… well, more confusing than ever.

## You shall not optimize (blindly)

> **Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.**  
>
> Therefore, *optimize responsibly*.  
>
> * Kent C. Dodds, [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)  

Pretty much every article I read touched on this: it’s wrong to optimize before profiling the application and every optimization comes with a cost that can easily outweigh the benefit.

In all the articles and comments on Stack Overflow, I could find, pretty much everyone agreed that there are cases where it’s pretty clear that memoization help:

* Big, *very big* lists
* Passing down components to optimized children
* Referential equality checks in hooks dependencies
* Computationally expensive functions (we’re talking prime numbers calculations!) 

I’ll stop here, for now. 
My goal is to keep digging into this argument and try to profile the application I maintain at work and come up with definitive data on which components actually benefit from memoization and which are actually slower thanks to it.

…stay tuned!

📚 As promised, I’ll leave here the list of articles I read on the subject:

* [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
* [Your Guide to React.useCallback()](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
* [When to use React.useCallback() | Ahead Creative](https://aheadcreative.co.uk/articles/when-to-use-react-usecallback/#:~:text=You%20should%20avoid%20seeing%20useCallback,a%20detrimental%20impact%20on%20performance.)
* [React Training: React, Inline Functions, and Performance](https://reacttraining.com/blog/react-inline-functions-and-performance/)
* [Lodash Memoize: You should not use lodash for memoization - DEV Community](https://dev.to/nioufe/you-should-not-use-lodash-for-memoization-3441)