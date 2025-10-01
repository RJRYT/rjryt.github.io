---
title: "ytsearch-cli — YouTube Search Command-Line Tool"
description: "A powerful and interactive CLI tool for searching YouTube videos, channels, and playlists directly from your terminal, built on top of ytsearch.js."
technologies: ["Node.js", "npm", "CLI"]
category: "Package"
status: "Maintained"
github: "https://github.com/RJRYT/ytsearch-cli"
live: "https://www.npmjs.com/package/ytsearch-cli"
image: "/images/projects/ytsearch-cli.png"
featured: false
date: "2025-09-20"
---

# ytsearch-cli — YouTube Search Command-Line Tool

## Overview

**ytsearch-cli** is the command-line version of [ytsearch.js](https://www.npmjs.com/package/ytsearch.js), offering developers and power users the ability to search YouTube directly from their terminal. It supports **videos, channels, playlists, video details, and playlist videos**, with multiple display modes and an **interactive search mode** for a smooth terminal experience.

Published to the **npm registry**, `ytsearch-cli` is a globally installable package designed for **speed, usability, and flexibility**.

## Features

* 🔍 **Search YouTube videos, channels, and playlists** directly from terminal.
* 📜 **Fetch video details & playlist videos** with one command.
* 🎛 **Multiple display modes** — default, compact, online, detailed.
* 🖥️ **Interactive Mode** (`--watch`) with arrow key navigation.
* ⚡ **Lightweight & Fast** — powered by `ytsearch.js`.
* 🎨 **Styled output** with tables, colors, and banners.
* 📦 **Easy installation**: `npm install -g ytsearch-cli`.
* 🔔 **Update notifier** — informs users of new versions.

## Installation

```bash
npm install -g ytsearch-cli
```

Run help menu:

```bash
ytsearch --help
```

## Usage

### Video Search

```bash
ytsearch video "never gonna give you up"
```

### Channel Search

```bash
ytsearch channel "RickAstleyVEVO"
```

### Playlist Search

```bash
ytsearch playlist "Top Hits 2025"
```

### Video Details

```bash
ytsearch details <videoId>
```

### Playlist Videos

```bash
ytsearch playlist-videos <playlistId>
```

### Search All Types

```bash
ytsearch search "lofi hip hop"
```

## Options

* `-l, --limit <n>` → Number of results (default: `10`)
* `-s, --sort <type>` → `relevance`, `upload_date`, `view_count`, `rating`
* `-m, --mode <type>` → `default`, `compact`, `online`, `detailed`
* `-j, --json` → Output raw JSON
* `-w, --watch` → Interactive mode

Example:

```bash
ytsearch video "javascript tutorial" -l 5 -m compact
```

## Display Modes

* **default** → Rich tables with video/channel/playlist info.
* **compact** → Minimal quick view.
* **online** → Clickable links in supported terminals.
* **detailed** → Full metadata (title, views, published date, duration, etc.).

## Interactive Mode

Run:

```bash
ytsearch --watch
```

Features:

* 🔄 Continuous search without rerunning commands.
* ⌨️ Arrow key navigation.
* ⚙️ Live update of settings (limit, sort, mode).
* 🎬 Quick preview of video/channel info.

## Example Output

```bash
ytsearch video "Black Panther" -l 3 -m compact

1. Marvel Studios Black Panther - Official Trailer | 50.5M views
2. Wakanda Battle - I’m Not Dead Scene - Black Panther Returns | 19.9M views
3. Hiding in the Shadows | The Real Black Panther | 4.2M views
```

## Tech Stack

* **ytsearch.js** — Core YouTube scraping/search library.
* **commander** — CLI framework for commands & options.
* **inquirer** — Interactive prompts.
* **chalk** — Colors and terminal styling.
* **figlet** — ASCII banners.
* **cli-table3** — Structured tables in terminal.
* **ora** — Loading spinners.
* **update-notifier** — Auto version check.

## Status

✅ Completed (September 30, 2025)
🛠️ Maintained with regular updates for features and bug fixes.

## Links

* 📦 **NPM Package**: [npmjs.com/package/ytsearch-cli](https://www.npmjs.com/package/ytsearch-cli)
* 💻 **GitHub Repository**: [github.com/RJRYT/ytsearch-cli](https://github.com/RJRYT/ytsearch-cli)
