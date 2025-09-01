---
title: "Discord Bot Dashboard"
description: "A web dashboard for managing Woebot, built with Node.js, Express, and EJS. Provides a user-friendly interface for bot configuration and monitoring."
technologies: ["Node.js", "Express.js", "EJS", "wio.db", "dotenv", "express-session", "express-rate-limit", "morgan"]
category: "Web"
status: "Completed"
github: "https://github.com/RJRYT/web-v1"
live: ""
image: "/images/projects/discord-dashboard.jpg"
featured: false
date: "2022-12-04"
---

# Discord Bot Dashboard

## Overview

The **Discord Bot Dashboard** is a web-based admin panel for managing **Woebot**, a multipurpose Discord bot.  
It was the first dashboard created for Woebot and was built using **Node.js, Express, and EJS** to provide a simple, server-side rendered UI.  

This project allowed bot administrators to configure settings, monitor status, and manage data in a user-friendly way instead of relying solely on Discord commands.

## Features

- **Express + EJS** based dashboard with server-side rendering.  
- Secure session handling with `express-session`.  
- Environment-based configuration with `.env` support.  
- Integrated rate limiting for API protection.  
- Persistent storage with `wio.db`.  
- Ready to deploy on local or cloud environments (e.g., Replit, VPS).  

## Setup

### Installation on Replit
1. Fork the project from [Replit Source](https://replit.com/@Somaliyo/woebot-web).  
2. Run `npm install` to install dependencies.  
3. Add a secret variable `PORT` and set the desired port (e.g., `3000`).  
4. Start the app with `npm start`.  

### Installation on Local
1. Clone the repository:  
   ```bash
   git clone https://github.com/RJRYT/web-v1.git
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Rename `example.env` to `.env` and configure environment variables.

4. Run the app:
    ```
    npm start
    ```

### Status

✅ Completed — Finished on December 4, 2022.