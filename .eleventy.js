const fs = require('fs')
const { DateTime } = require('luxon')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages')
const timeToRead = require('eleventy-plugin-time-to-read')

module.exports = function (eleventyConfig) {
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

    eleventyConfig.addPassthroughCopy('src/admin')
    eleventyConfig.addPassthroughCopy('src/images')
    eleventyConfig.addWatchTarget('src/css/')
    eleventyConfig.addPlugin(lazyImagesPlugin)
    eleventyConfig.addPlugin(timeToRead)

    eleventyConfig.setTemplateFormats(['html', 'md'])

    eleventyConfig.addCollection('posts', (collection) => {
        return collection.getFilteredByGlob('src/blog/*.md')
    })

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
            'dd LLL yyyy'
        )
    })

    eleventyConfig.addFilter('debugger', (...args) => {
        console.log(...args)
        debugger
    })

    eleventyConfig.addFilter('code', (content) => {
        const openPre = /<pre>/gim
        const closePre = /<\/pre>/gim

        content = content.replace(
            openPre,
            '<div class="code__block code__block--notabs"><pre class="code code--block">'
        )
        content.replace(closePre, '</pre>/div>')

        return content
    })

    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    }
}
