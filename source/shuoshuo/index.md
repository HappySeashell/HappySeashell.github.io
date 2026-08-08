---
title: 说说
date: 2021-09-02 12:02:02
comments: false
description: 记录日常片段与随想
---
<link rel="stylesheet" href="/vendor/momentide/0.1.0/artitalk.min.css">
<script src="/vendor/momentide/0.1.0/artitalk.min.js"></script>
<div id="artitalk_main"></div>
<script>
const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
new Artitalk({
    serverURL: isLocalPreview ? 'http://127.0.0.1:3000' : 'https://blog-api-mu-drab.vercel.app',
    turnstileSiteKey: isLocalPreview ? '1x00000000000000000000AA' : '0x4AAAAAAEKOsCUG2kHHz619',
    color1: '#CCA941',
    color2: '#544A7D',
    color3: '#FFFFFF',
    pageSize: 20,
    mediaUploadEnabled: false
})
</script>
