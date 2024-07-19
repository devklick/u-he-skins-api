<h1 align="center">
    u-he Skins API
</h1>

[u-he](https://u-he.com/) create cross platform virtual synthesizers and
audio effects. They also provide a [page](https://u-he.com/PatchLib/skins.html)
listing various skins that are available to download and use on their products.

This repository contains the source code for an Node.js application containing
a single API endpoint which converts the HTML for the skins page to JSON.

### Hosted API

This API is hosted on [Render](https://render.com/) using the free tier. As such,
it's performance isnt great, so load times can be poor. See for yourself:

https://u-he-skins-api.onrender.com/skins

### UI

The data returned by this API is consumed by the code hosted in another of my repositories, [u-he-skins](https://github.com/devklick/u-he-skins), which is deployed to github pages:

https://devklick.github.io/u-he-skins/
