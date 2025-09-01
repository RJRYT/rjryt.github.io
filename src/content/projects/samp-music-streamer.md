---
title: "SAMP Music Streamer"
description: "A Node.js-based music streaming service built for SAMP Roleplay servers, allowing players to upload, manage, and stream custom songs in-game."
technologies: ["Node.js", "Express.js", "EJS", "File Uploads", "Pterodactyl", "Replit", "Heroku"]
category: "SAMP"
status: "Completed"
github: "https://github.com/RJRYT/SAMP-Music-Streamer"
live: ""
image: "/images/projects/samp-music.png"
featured: false
date: "2025-03-27"
---

# SAMP Music Streamer

The **SAMP Music Streamer** is a custom music server solution for **San Andreas Multiplayer (SAMP) Roleplay servers**.  
It enables server admins and players to stream and manage custom audio files directly in-game.

## Key Features

- 🎵 Upload and manage custom music for SAMP servers.  
- 📂 File management routes for listing, renaming, and deleting tracks.  
- 🔑 Auth-protected admin routes for secure operations.  
- 🌐 Multi-platform availability: can run on **Pterodactyl Panel, Replit, or Heroku**.  
- 📜 Licensed under **Apache 2.0**.  

## Routes

- `/` → Upload new music  
- `/list` → List all uploaded music  
- `/music` → Music listing for SAMP integration  
- `/rename/:authcode` → Rename uploaded music (Auth required)  
- `/delete/:authcode/:filename` → Delete music by filename (Auth required)  

## Tech Stack

- **Backend:** Node.js, Express  
- **Templating:** EJS with ejs-mate  
- **Middleware:** body-parser, cors, morgan  
- **File Handling:** express-fileupload, fs-extra  

📅 Completed: **March 27, 2025**  
