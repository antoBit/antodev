---
layout: layouts/post.njk
title: Expose your work with ngrok and localtunnel
description: Local development made easy with ngrok and localtunnel.
date: 2023-01-26T08:43:54.247Z
metaDescription: Expose a webserver to the public with a local tunnel powered by
    ngrok. Easily connect to public APIs and show work to clients everywhere.
metaKeywords:
    - web
    - developer
    - javascript
    - js
    - code
    - coding
    - localtunnel
    - ngrok
    - api
tags:
    - javascript
    - tips
disableComments: false
---

Have you ever found yourself wanting to show your work to a client, but didn’t want to setup a server only for that reason? Or maybe you wanted to use the APIs of a particular service, but they didn’t allow /localhost/ as a valid IP address in their access whitelist?

If the answer is yes, then this post is for you.

## Ngrok to the rescue!

From ngrok’s [official website](https://ngrok.com) :

> ngrok is a simplified API-first ingress-as-a-service that adds connectivity, security, and observability to your apps with no code changes.

What!? Let’s translate this: ngrok is an application that creates a tunnel between your computer and the internet, solving a couple of the most commons hiccups when developing web applications:

1. Show someone else your work in progress without having to deploy it to a remote branch and running it on a hosting space
2. Consume APIs that only accepts secure HTTPS connections (and complain when you try to whitelist /localhost/!)

Ngrok can be installed in all major operating systems as a standalone service. Its developer license is _free_ (with some restrictions like bandwidth and usage), but /it requires the creation of an account/.

To install it in MacOS we can use brew:

```bash
brew install ngrok/ngrok/ngrok
```

Instructions for different operating systems can be found [in the docs](https://ngrok.com/docs/getting-started).

## But how does it work?

When using ngrok, we can expose a web server on our machine, for example, a Node.js application running on /localhost:8000/ to the outer world by starting ngrok. The service will create a tunnel between our machine and the internet using a /random URL/ that we can share with other people.

```bash
ngrok http 8000
```

## Some of its options and features features

### Automated SSL/TLS certificates

Ngrok supports HTTPS out of the box, and we have a couple of ways to set this up.
The easiest way is to specify it as a complete address:

```bash
ngrok http https://localhost:8000
```

Another way to do that is by connecting ngrok on port 443. It will assume by default that we want to use the HTTPS protocol:

```bash
ngrok http 443
```

### Custom domains

Custom domains are a paid feature, however, custom subdomains can be configured easily and work with the free plan.

```bash
ngrok http --subdomain=antopiras 80
```

### Authentication

Ngrok also supports basic authentication (specify user and password when setting it up), OAuth 2.0 (Google/GitHub account), and other forms of authentication.
We can add authentication with:

```bash
ngrok http --basic-auth="username:password" 8080
```

Or

```bash
ngrok http 8000 --oauth google
```

## Use it in your Node.js application

If we don’t want to have to set up and manually start ngrok every time we come back to our laptop or we are looking for a more automated solution, we can use [this Node.js wrapper](https://github.com/bubenshchykov/ngrok).

```javascript
const express = require('express')
const ngrok = require('ngrok')

const app = express()
const port = 8000
const NGROK_AUTH_TOKEN = ‘NGROK_AUTH_TOKEN’

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  await ngrok.authtoken(NGROK_AUTH_TOKEN)
  const url = await ngrok.connect(port)

  console.log(`Example app listening on port ${port}`)
  console.log('ngrok tunnel url: ', url)
})
```

Once we have connected, we can retrieve the ngrok URL and use it inside our application.

## An alternative to ngrok

If you find ngrok too complex to use and want an easy and quick-to-use alternative for Node, check out [localtunnel](https://theboroer.github.io/localtunnel-www/):

```bash
npm install -g localtunnel //use -g if you want to install it globally on your machine
```

It’s an NPM package and it is pretty similar to ngrok, but it doesn’t require you to create an account. It also supports subdomains.

To use it in our simple application we just need to change a couple of lines:

```javascript
const localtunnel = require('localtunnel')

//…

app.listen(port, async () => {
    const tunnel = await localtunnel({ port })

    console.log(`Example app listening on port ${port}`)
    console.log('localtunnel tunnel url: ', tunnel.url)
})
```

…and that’s it! I hope you found this little guide useful. Leave a comment if you have more questions about this 😄
