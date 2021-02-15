const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/admin" : "admin"});
    
    eleventyConfig.setTemplateFormats([
      "html",
      "md",
      "css",
      "svg"
    ])

    eleventyConfig.addCollection("posts", collection => {
      return collection.getFilteredByGlob("src/blog/*.md");
    })

    eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    })

    eleventyConfig.addFilter("debugger", (...args) => {
      console.log(...args)
      debugger;
    })

    eleventyConfig.addFilter("code", content => {
      const openPre = /<pre>/igm
      const closePre = /<\/pre>/igm
    
      content = content.replace(openPre, '<div class="code__block code__block--notabs"><pre class="code code--block">')
      content.replace(closePre, '</pre>/div>')

      return content
    })

    return {
      dir: {
        input: "src",
        output: "_site",
      }
    }
  }