---
layout: layouts/post.njk
title: Using the MediaStream Web API to record screen, camera and audio
description: Record screen, camera and audio in javascript using the MediaStream Web API
date: 2021-05-15T18:07:06.071Z
metaDescription: Record screen, camera and audio in javascript using the MediaStream Web API
metaKeywords:
  - javascript
  - media
  - recorder
  - stream
  - screen
  - camera
  - audio
  - api
tags:
  - javascript
  - api
disableComments: false
---
Lately at work I had to create an app to let our users record their screen or camera and audio *directly in the browser*.

While the MDN web docs are well documented, there were a couple of issues I encountered down the road and I had to do quite a bit of googling around, testing some NPM packages and fight off weird browser compatibility issues, so… I though I would spare the souls of my fellow developers after me 😅

## The idea

What I want to achieve here is fairly simple: let the users record either their screen or their camera *plus audio* and obtain a video of the recording. 

Recording the camera and audio is fairly simple, since it uses the same API interface to record both devices and we have to work with a single stream.

Recording screen and audio requires us to merge two different media streams from two different APIs, but as you will see this is not that complicated.

Let’s outline what we’re going to do:

1. Use the [MediaDevices interface](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) to capture a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) from the user’s devices


2. Record the media from the stream using the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) to generate a Blob object containing the recorded data


3. Create a new [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) from the MediaRecorder data and generate a URL from it to download the video from

## Time to write some code

*DISCLAIMER*: Most of the code here is meant to be used as an example.

In order to keep it as simple as possible I won’t be worrying about checking if the browser supports the API used in the code (at the time of writing, only Chrome and Firefox do) and so I won’t add any error handling, try/catch statements, etc…. 

Please don’t put any of this in production, I decline any responsibility in that case 🤣

### Camera and audio stream

To record the webcam and the audio from a microphone (either the computer internal microphone or an external one) we can use the [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) interface:

```javascript
async function captureMediaDevices(mediaConstraints = {
    video: {
      width: 1280,
      height: 720
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    }
  }) {
  const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
  return stream
}
```

For simplicity’s sake I’m keeping the configuration options for the screen capture (the `mediaConstraints` object) very minimal, but there are quite a few options that can be configured, like the preferred device (useful for multiple webcam or microphone setups), sample rate, volume…

You can find more details here: [DisplayMediaStreamConstraints - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DisplayMediaStreamConstraints)

### Screen stream

To record the user’s screen, be it a browser window, and application or the entire screen, the code is very similar:

```javascript
async function captureScreen(mediaConstraints = {
  {
    video: {
      cursor: 'always',
      resizeMode: 'crop-and-scale'
    },
		audio: false
  }
}) {
  const screenStream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints)
  return screenStream
}
```

Note that both examples are asynchronous functions because the MediaDevice interface returns a promise.

### Record the streams

To record the stream obtained before we will use the MediaRecorder API:

```javascript
let recorder = null

async function recordStream() {
  const stream = await captureMediaDevices()
  recorder = new MediaRecorder(stream)
  let chunks = []

  recorder.ondataavailable = event => {
    if (event.data.size > 0) {
      chunks.push(event.data)
    }
  }
  
  recorder.onstop = () => {
    const blob = new Blob(chunks, {
      type: 'video/webm;codecs=vp9'
    })
    
    chunks = []
    const blobUrl = URL.createObjectURL(blob)

    console.log(blobUrl)
   }
  
  recorder.start(200)
}
```

Let’s go through this step by step:

```javascript
const stream = await captureMediaDevices()
recorder = new MediaRecorder(stream)
let chunks = []
```

Here we just initialise the stream and the MediaRecorder with an empty `chunks` array that will contain the recorded chunks of data.

```javascript
recorder.ondataavailable = event => {
  if (event.data.size > 0) {
    chunks.push(event.data)
  }
}
```

On the MediaRecorder `ondataavailable` event we tell the MediaRecorder to push the recorded data inside the `chunks` array.

```javascript
recorder.onstop = () => {
  const blob = new Blob(chunks, {
    type: 'video/webm'
  })
    
  chunks = []
  const blobUrl = URL.createObjectURL(blob)

  console.log(blobUrl)
}
```

The `onstop` event handler creates a new Blob containing the recorded data stored in the `chunks` variable and the video/webm `mymeType`.

After that a URL is created from the blob and printed to the console. This URL can be used to download the file or upload it to a server.

```javascript
recorder.start(200)
```

This final method start the recording with a /200ms/ time interval.

### Stop the recording

In order to stop the recording and release the user’s devices we need to call the `stop()` method on track of the stream:

```javascript
function stopRecording() {
 recorder.stream.getTracks().forEach(track => track.stop())
}
```

## Ok, but what about both screen and audio?

To record both the screen and the audio we need to obtain two separate streams and merge them into one single stream:

```javascript
const screenStream = await captureScreen()
const audioStream = await captureMediaDevices({
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  },
  video: false
})
  
const stream = new MediaStream([...screenStream.getTracks(), ...audioStream.getTracks()])
```

I’m using the same `captureMediaDevices` function to capture the audio from the computer by overriding the function parameter.

Then, using the `getTracks()` method of the `MediaStream` I’m obtaining every track of the two streams to create a new stream.

The rest of the code is the same as above.

## Wrapping up…

This is everything you need to know to get started with media recording in the browser. 
The MDN docs are an helpful resource for all the other methods and configurations available.

In a real world application you would worry about checking the browser compliance with the APIs, stopping and resuming the stream, choosing between multiple devices as well as providing a real time preview of the stream and/or of the downloaded video, something that you could do like this:

```javascript
const video = document.getElementById('video')

video.srcObject = stream //to preview the stream

video.src = blobUrl // to preview the finished video
```

## Review the entire code

I set up a small GitHub gist with the entire code from this article, check it out here: [MediaStream API Example · GitHub](https://gist.github.com/antoBit/bc954852849d1989653b99169ceece47)

I hope this has been helpful. If you want me to dive into it a little bit more or maybe tackle some real-world examples like choosing between multiple cameras and microphones let me know in the comments below 💪🏻