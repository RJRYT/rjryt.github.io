---
title: "ytsearch.js — YouTube Search Wrapper"
description: "A lightweight npm package for searching YouTube content directly in Node.js applications."
technologies: ["Node.js", "npm"]
category: "Package / Library"
status: "Maintained"
github: "https://github.com/RJRYT/ytsearch.js"
live: "https://www.npmjs.com/package/ytsearch.js"
image: "/images/projects/ytsearch.png"
featured: false
date: "2023-07-15"
---

# ytsearch.js — YouTube Search Wrapper

## Overview

**ytsearch.js** is a simple and lightweight **Node.js wrapper** for searching YouTube content.  
It enables developers to quickly fetch YouTube video data (title, views, etc.) directly into their projects without relying on complex APIs.  
Published to the **npm registry**, the package is designed to be easy-to-use and plug-and-play for any Node.js application.

## Features

- 🔍 **Search YouTube videos** directly from Node.js.  
- ⚡ **Lightweight & Fast** — minimal dependencies.  
- 📦 **Easy Installation** via `npm install ytsearch.js`.  
- 🛠️ **Beginner-Friendly API** — simple async function call.  
- 📊 **Metadata Access** — titles, view counts, and more.  
- 🌐 **Available on npm** with growing downloads.  

## Installation

```bash
npm install ytsearch.js
```

## Usage

```js
const ytsearch = require('ytsearch.js');

const results = await ytsearch("Black Panther");
for (let i = 0; i < 6; i++) {
  console.log(results[i].title, results[i].shortViewCount);
}
```

### Example Output

```
Marvel Studios Black Panther - Official Trailer 50.5M
Wakanda Battle - I’m Not Dead Scene - Black Panther Returns - Black Panther (2018) Movie Clip 19.9M
Hiding in the Shadows | The Real Black Panther | National Geographic Wild UK 4.2M
Meet The K2 Black Panther – One Of The World’s Best Tanks (Not Made In the USA) 13K
(Black Panther) Best Action Hollywood Blockbuster Movie in Hindi Full Action HD 633.7K
Black Panther - Car Chase Scene - Movie clip Epic 4K UHD 428.8K
```

## Tech Stack

- **Node.js** — Core runtime environment.  
- **npm** — Package distribution.  

## Status

✅ Completed (July 15, 2023)  
🛠️ Actively maintained with plans for new features (extended metadata, better error handling, possibly YouTube Data API v3 integration).  

## Links

- 📦 **NPM Package**: [npmjs.com/package/ytsearch.js](https://www.npmjs.com/package/ytsearch.js)  
