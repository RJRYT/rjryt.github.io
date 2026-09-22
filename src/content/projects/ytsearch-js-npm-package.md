---
title: "ytsearch.js — YouTube Search & Playlist Scraper"
description: "TypeScript and Node.js library for YouTube search and playlist data. Search videos, channels, playlists, movies, and live streams, with video details and pagination without the YouTube Data API."
technologies: ["Node.js", "npm"]
category: "Package"
status: "Maintained"
github: "https://github.com/RJRYT/ytsearch.js"
live: "https://www.npmjs.com/package/ytsearch.js"
image: "/images/projects/ytsearch.png"
featured: false
date: "2023-07-15"
---

# ytsearch.js — YouTube Search & Playlist Scraper for Node.js

## Overview

**ytsearch.js** is a TypeScript and Node.js library for YouTube search and playlist data. It allows developers to search YouTube videos, channels, playlists, movies, and live streams without requiring the official YouTube Data API.
The library also provides YouTube video details, playlist items with pagination, sorting, result limits, and TypeScript support, making it useful for applications that need programmatic YouTube search and metadata.

## Features

* 🔍 **YouTube Search** — Search videos, channels, playlists, movies, and live streams.
* 📑 **Playlist Pagination** — Fetch playlist items across multiple pages.
* 📊 **Video Metadata** — Retrieve detailed information for YouTube videos.
* ⚡ **Lightweight API** — Simple developer-friendly API with minimal dependencies.
* 📦 **Easy Installation** — Install with `npm install ytsearch.js`.
* 🛠️ **TypeScript Support** — Includes TypeScript declarations with CommonJS and ESM support.
* 🎯 **Search Options** — Control result types, limits, and sorting.
* 🔌 **No YouTube Data API Key** — Search publicly available YouTube data without an official API key.

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

* **TypeScript** — Type-safe library development and declarations.
* **Node.js** — Core runtime environment.
* **npm** — Package distribution.

## Related Project

### ytsearch-cli — YouTube Search from the Terminal

[ytsearch-cli](https://rjryt.github.io/projects/ytsearch-cli-npm-package) is the command-line interface powered by ytsearch.js. It brings YouTube video, channel, and playlist search directly to the terminal with formatted output, JSON support, and interactive search.

## Status

🛠️ Actively maintained with continuous updates — including **playlist pagination**, **advanced metadata fetching**, **sortable search results**, and planned **API enhancements**.

## Links

* 📦 **NPM Package**: [ytsearch.js on npm](https://www.npmjs.com/package/ytsearch.js)
* 📖 **Documentation & Wiki**: [ytsearch.js on GitHub Wiki](https://github.com/RJRYT/ytsearch.js/wiki)
* 💻 **GitHub Repository**: [RJRYT/ytsearch.js](https://github.com/RJRYT/ytsearch.js)
* 🖥️ **Command-Line Interface**: [ytsearch-cli](https://rjryt.github.io/projects/ytsearch-cli-npm-package)
