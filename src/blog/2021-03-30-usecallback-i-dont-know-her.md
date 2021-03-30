---
layout: layouts/post.njk
title: useCallback? I don't know her.
description: Should you wrap every single function in useCallback? Or should you
  go for code readability and hope for the best? Well, it depends.
date: 2021-03-30T11:26:29.725Z
metaDescription: A small journey into the world of React memoization and when to
  use (or not!) useCallback and useMemo.
metaImage: /images/uploads/carbon.png
metaKeywords:
  - web
  - developer
  - javascript
  - js
  - code
  - coding
tags:
  - react
  - js
  - optimisation
  - developer
  - coding
---
# Profiling React Apps
## I don’t know React
My React journey has been a constant learning experience, but there’s something about React that has been bugging me lately.

Ever since I changed company last year, I found myself in a new codebase and with it came something I never saw before: an /odd quantity/ of useCallback in every single component of the app.

I have to admit I was responsible for most of a medium/big react app at my previous company and it always ran smoothly even without this heavy optimisation. 
Of course, thanks to my beloved impostor syndrome I immediately thought “oh god, I’m a terrible developer, I don’t know React, I never use memoization”. You know, the usual. 

## PR Review anxiety
Since I was not familiar with the concept of useCallback, useMemo (and loads `memoize`!) 

I immediately documented myself, but all I could find where articles and tutorials about how to use these hooks and functions, and none of them touched deeply on the dependency array, which is something I constantly screw up!

Lately I’ve been reading a lot on the use of `useCallback` and `useMemo` in a React app (useful links at the end of the post ✏️) because I wasn’t comfortable with my /fake it ‘till you make it/ approach to this part of the framework and what I read was… well, more confusing than ever.

## You shall not optimise (blindly)
> *Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.*
> 
> Therefore, /optimize responsibly/.
> - Kent C. Dodds, [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

#personali/blog