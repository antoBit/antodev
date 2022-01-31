const fs = require('fs')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const { DateTime } = require('luxon')
const { minify } = require('terser')
const eleventyGoogleFonts = require('eleventy-google-fonts')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const timeToRead = require('eleventy-plugin-time-to-read')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginPWA = require('eleventy-plugin-pwa')

module.exports = function (eleventyConfig) {
    const markdownItOptions = {
        html: true,
        breaks: true,
        linkify: false,
    }
    const markdownLib = markdownIt(markdownItOptions)
        .use(markdownItAnchor, {
            level: [2],
            permalink: true,
            permalinkSymbol: '<i class="icon-link" aria-hidden="true"></i>',
            permalinkAttrs: () => ({ 'aria-label': 'Link to this section' }),
        })
        .use(markdownItAttrs, {
            allowedAttributes: ['rel', 'target'],
        })

    eleventyConfig.setLibrary('md', markdownLib)

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('_site/404.html')
                    // Add 404 http status code in request header.
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=UTF-8',
                    })
                    // Provides the 404 content without redirect.
                    res.write(content_404)
                    res.end()
                })
            },
        },
    })

    eleventyConfig.addNunjucksAsyncFilter(
        'jsmin',
        async function (code, callback) {
            try {
                const minified = await minify(code)
                callback(null, minified.code)
            } catch (err) {
                console.error('Terser error: ', err)
                callback(null, code)
            }
        }
    )

    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

    eleventyConfig.addPassthroughCopy('src/admin')
    eleventyConfig.addPassthroughCopy('src/fonts')
    eleventyConfig.addPassthroughCopy('src/images')
    eleventyConfig.addPassthroughCopy('src/scripts/*.js.*')

    eleventyConfig.addWatchTarget('src/css/')

    eleventyConfig.addPlugin(eleventyGoogleFonts)
    eleventyConfig.addPlugin(lazyImagesPlugin)
    eleventyConfig.addPlugin(timeToRead)
    eleventyConfig.addPlugin(syntaxHighlight, {
        alwaysWrapLineHighlights: true,
    })
    eleventyConfig.addPlugin(pluginPWA, {
        runtimeCaching: [
            {
                urlPattern: /images/,
                handler: 'cacheFirst',
            },
            {
                urlPattern: new RegExp(
                    '^https://fonts.(?:googleapis|gstatic).com/(.*)'
                ),
                handler: 'cacheFirst',
            },
            {
                urlPattern: /.*/,
                handler: 'networkFirst',
            },
        ],
    })

    eleventyConfig.setTemplateFormats(['html', 'md'])

    eleventyConfig.addCollection('posts', (collection) => {
        return collection.getFilteredByGlob('src/blog/*.md')
    })

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
            'dd LLL yyyy'
        )
    })

    eleventyConfig.addFilter('redabledateFromFormat', (date) => {
        return DateTime.fromFormat(
            date,
            'EEE MMM dd HH:mm:ss ZZZ yyyy'
        ).toFormat('dd LLL yyyy')
    })

    eleventyConfig.addFilter('debugger', (...args) => {
        console.log(...args)
        debugger
    })

    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    }
}
