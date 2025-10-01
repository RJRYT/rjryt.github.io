---
title: "ytsearch.js — YouTube Search Wrapper"
description: "A powerful Node.js package for YouTube search that supports videos, channels, playlists, movies, and live streams — all without the official API."
technologies: ["Node.js", "npm"]
category: "Package"
status: "Maintained"
github: "https://github.com/RJRYT/ytsearch.js"
live: "https://www.npmjs.com/package/ytsearch.js"
image: "/images/projects/ytsearch.png"
featured: false
date: "2023-07-15"
---

# ytsearch.js — YouTube Search Wrapper

## Overview

**ytsearch.js** is a powerful yet lightweight **Node.js package** that allows developers to perform YouTube searches without relying on the official YouTube Data API.
It supports fetching **videos, channels, playlists, movies, and live streams**, complete with pagination, sorting, and extended metadata. Designed with a **developer-friendly API**, it offers a clean, fast, and efficient way to integrate YouTube search into any Node.js application.

## Features

* 🔍 **Search YouTube content** — videos, channels, playlists, movies, and live streams.
* ⚡ **Fast & Lightweight** — optimized with minimal dependencies.
* 📦 **Easy Installation** via `npm install ytsearch.js`.
* 🛠️ **Developer-Friendly API** — async/await support and clean typings.
* 📊 **Rich Metadata Access** — titles, views, channel details, and more.
* 📑 **Pagination Support** — handle large playlists and multi-page search results.
* 🎯 **Advanced Options** — filtering, sorting, and combined multi-type searches (`any`).
* ✅ **Error Handling** — robust mechanisms to ensure reliability.

## Installation

```bash
npm install ytsearch.js
```

Requires **Node.js v14+**.

## Usage

```js
const { searchYouTube } = require("ytsearch.js");

(async () => {
  const results = await searchYouTube("Black Panther", {
    type: "video",
    limit: 10,
  });
  results.videos.forEach((item) => console.log(item.type, item.title));
})();
```

### Example Output

```
video Marvel Studios Black Panther - Official Trailer
video Wakanda Battle - I’m Not Dead Scene - Black Panther Returns
video Hiding in the Shadows | The Real Black Panther | National Geographic Wild UK
video Meet The K2 Black Panther – One Of The World’s Best Tanks
video (Black Panther) Best Action Hollywood Blockbuster Movie in Hindi
video Black Panther - Car Chase Scene - Movie clip Epic 4K UHD
```

## Tech Stack

* **Node.js** — Core runtime environment.
* **npm** — Package distribution.

## Status

🛠️ Actively maintained with continuous updates — including **playlist pagination**, **advanced metadata fetching**, **sortable search results**, and planned **API enhancements**.

## Links

* 📦 **NPM Package**: [npmjs.com/package/ytsearch.js](https://www.npmjs.com/package/ytsearch.js)
* 📖 **Documentation & Wiki**: [GitHub Wiki](https://github.com/RJRYT/ytsearch.js/wiki)
