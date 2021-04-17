---
layout: layouts/post.njk
title: Add comments to your static blog with utterances
description: How to add a comment section to a static blog using GitHub issues
date: 2021-04-17T11:14:35.887Z
metaDescription: Add comments to your jamstack blog with utterances, a
  lightweight script that uses GitHub issues.
metaImage: /images/uploads/cleanshot-2021-04-17-at-12.53.16-2x.jpg
metaKeywords:
  - web
  - developer
  - javascript
  - js
  - code
  - coding
tags:
  - 11ty
  - comments
  - utterances
  - jamstack
  - github
disableComments: false
---
A while ago I was looking for a way to add a comment section to my static blog.

## What’s on the menu

### Disqus

The first solution I looked into is [Disqus](https://blog.disqus.com/){rel="noopener noreferrer" target="_blank"}, but I soon decided not to use it simply because, while it’s a valid software with a huge community, it has some glaring flaws (at least for me):

* the basic plan comes with ads
* it tracks its users
* if anonymous commenting is turned off, people need to create a Disqus account (more on that later)
* it’s way too complex for my needs

### Jamstack Comments Engine

[Jamstack Comments Engine](https://jamstack-comments.netlify.app/){rel="noopener noreferrer" target="_blank"} “… is an example of how a  Jamstack  site can implement comments.”

Ok, this is not exactly the first search result that comes up when googling “static blog comments”, but I ran into it and thought about simply because, from a developer point of view, it is a very smart approach.

The solution proposed here consists of a combination of [Netlify Forms](https://docs.netlify.com/forms/setup/){rel="noopener noreferrer" target="_blank"} and its Submission API to trigger a new build of the web every time a comment is posted, after it’s approved by a moderator. It additionally explain how to create a Lambda function to get notified on Slack whenever a new comment comes in.

While I found this approach very interesting, I still have a day job and didn’t want to embark on the somewhat long, even though /very well documented/, process.

## utterances

After I gave up on the comments feature (no one reads my two months old blog anyway), I stumbled upon [utterances](https://utteranc.es/){rel="noopener noreferrer" target="_blank"} and it blew my mind with its simplicity. It took me 10 minutes to add it to this blog, build time included.

<figure>
    <img class="rounded-corners" src="/images/uploads/cleanshot-2021-04-17-at-12.53.16-2x.jpg" alt="Terminal" title="Terminal" />
    <figcaption class="image-caption-text">This is how the comment section will appear, from utterances homepage.</a></figcaption>
</figure>

### The perks

Straight from their page:

1. It’s [open source](https://github.com/utterance){rel="noopener noreferrer" target="_blank"}
2. It doesn’t track users
3. No ads 👏🏻
4. All the comments data is stored in GitHub issues
5. It’s lightweight

### So, how does it work?

First of all, it uses GitHub issues to track comments, based on the post title: the first person to comment on a blog post will trigger the creation of a related issue and future comments on the same post will end up in that issue.

Smart, right? 🔮

The only requirements are that the repository connected to the app needs to be public and have the [utterances app](https://github.com/apps/utterances){rel="noopener noreferrer" target="_blank"} installed on it.

Users will comment using their GitHub account, which is perfect for a tech/programming blog.

Oh, and it comes with 8 themes that will play well with most of the color palette of the blogs out there!

## How to install it

Their page is pretty straightforward: just follow the configuration steps (repository name, optional label for the issues, chosen theme) and you’re left with a script tag to add to your blog template:

```html
<script src="https://utteranc.es/client.js"
        repo="antoBit/antodev"
        issue-term="title"
        label="💬"
        theme="dark-blue"
        crossorigin="anonymous"
        async>
</script>
```

Note that the issue label supports emojis! 🎉

After that, just remember to install the *utterances app* on the same repository you provided in the `repo` attribute and you’re done!

## Shameless plug

If you found this post useful and you liked it, why don’t you leave a comment below? I’d like to know what you think about this.

Thanks for reading!