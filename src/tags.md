---
layout: 'layouts/tags.njk'
title: 'antodev - Tags'
description: 'Tag archive'
metaDescription: 'Web Developer personal blog'
metaKeywords: ['web', 'developer', 'javascript', 'js', 'code', 'coding']
pagination:
    data: collections
    size: 1
    alias: tag
    filter:
        - all
permalink: /tags/{{ tag }}/
eleventyComputed:
    title: '{{ tag }}'
    metaDescription: 'Blog posts archived under {{ tag }}'
    metaKeywords:
        ['{{ tag }}', 'web', 'developer', 'javascript', 'js', 'code', 'coding']
---
