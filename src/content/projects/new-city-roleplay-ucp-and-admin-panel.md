---
title: "New City Roleplay — UCP & Admin Panel"
description: "A modern, installable user control panel and admin dashboard for the New City Roleplay SA-MP server, featuring Discord OAuth, PWA/TWA support, push notifications, and Mongo→MySQL migration utilities."
technologies: ["React", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MySQL", "Discord OAuth", "Web Push"]
category: "SAMP"
status: "Completed"
github: ""
live: "https://newcityrp.co.in"
image: "/images/projects/ncrp-ucp.png"
featured: false
date: "2025-05-01"
---

# New City Roleplay — UCP & Admin Panel

The **New City Roleplay — UCP (User Control Panel)** is a web-based application built for the **New City Roleplay SA-MP server (NCRP)**.  
It provides players and admins with a robust, installable platform to manage accounts, view updates, receive push notifications, and handle in-game integrations seamlessly.  

This project is **actively maintained** and forms the backbone of the community management system for NCRP.

---

## Key Features

- **Discord OAuth (robust flow):** Handles idempotent callbacks and duplicate requests from TWA environments.  
- **Installable PWA / TWA:** Deep-link support with `protocol_handlers` for `web+ncrp`.  
- **JWT Authentication:** Secure token-based auth for persistent sessions.  
- **Push Notifications:** Category-based subscriptions (`server_status`, `events`, `faction_updates`, `premium_offers`).  
- **Admin Debug Console:** Live log capture, XHR/fetch monitoring, runtime error reporting, safe evaluator, and command history.  
- **Mongo → MySQL Migration Utilities:** Tools for converting legacy patch notes, roles, permissions, and routes into normalized MySQL `w_` tables.  
- **Clear App Data Tools:** Secure two-step reset for cached data and tokens.  

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Helmet, Vite/CRA  
- **Backend:** Node.js, Express, Passport (Discord OAuth strategy), JWT  
- **Database:** MySQL (primary), MongoDB (legacy migration)  
- **Push Service:** Web Push (VAPID)  
- **Optional:** Redis (recommended for scaling)  
- **Other:** Service Workers & Web Manifest for PWA installability  

---

## Project Notes

- Originally designed for **NCRP (New City Roleplay)** as a **personal project**.  
- Still actively **maintained and updated** with new server integrations.  
- Includes **admin panel modules** for monitoring and management.  

📅 First deployed: **2025 (actively maintained)**  
