---
title: "Dating App — Internship Prototype"
description: "A prototype dating application developed during internship, featuring authentication, profile management, real-time communication, and secure media uploads."
technologies: ["React", "Bootstrap", "Node.js", "Express", "MongoDB", "AWS S3", "Twilio", "Passport OAuth"]
category: "Internship / Prototype"
status: "Prototype Completed"
github: "https://github.com/RJRYT/GVR-DatingApp/"
live: ""
image: "/images/projects/dating-app.png"
featured: false
date: "2024-07-29"
---

# Dating App — Internship Prototype

## Overview

This **Dating App** was developed during an internship as a **prototype project**.  
It is designed to help users connect via secure authentication, profile creation, and preferences-based matchmaking.  
The app supports **Google OAuth login, secure image uploads via AWS S3, SMS/OTP verification using Twilio, and session-based authentication**.  

The prototype demonstrates a scalable, secure foundation for building a modern dating platform.

---

## Features

- 🔐 **Authentication**
  - Email/password login with bcrypt & JWT
  - Google OAuth (Passport.js integration)
  - Secure sessions with cookies

- 👤 **User Profiles**
  - Create/edit profile with bio, age, gender, preferences
  - Upload profile photos (AWS S3 storage)
  - Match filtering via `react-select`

- 💬 **Communication**
  - OTP/SMS verification with Twilio
  - Real-time notifications (prototype with `node-cron`)

- 📅 **User Engagement**
  - Match suggestions based on preferences
  - Session handling with `express-session`
  - Profile browsing & liking (prototype level)

---

## Tech Stack

### Frontend
- React 18  
- React Router DOM 6  
- React Bootstrap + Bootstrap 5  
- Axios (API calls)  
- React Select (match filters)  
- React Toastify (alerts & notifications)  
- JWT Decode (auth handling)  

### Backend
- Node.js + Express  
- MongoDB with Mongoose  
- JWT + bcrypt for secure auth  
- Passport (Google OAuth 2.0)  
- Express Session & Cookie Parser  
- AWS S3 with `multer-s3` for media storage  
- Twilio API for OTP & SMS services  
- Node-cron for scheduled tasks  
- Morgan for API logging  

---

## Architecture

- **Frontend** → React-based SPA with Bootstrap UI  
- **Backend** → REST API (Express + MongoDB)  
- **Authentication** → JWT & Passport Google OAuth  
- **Media Storage** → AWS S3 (images, profile photos)  
- **Messaging/Notifications** → Twilio + Node-cron prototype  
- **Deployment** → Internship prototype (local/server environment)  

---

## Project Stats

- **Frontend Dependencies**: 9  
- **Backend Dependencies**: 17  
- **Auth Methods**: Email/Password + Google OAuth  
- **Prototype Features**: Profiles, Auth, AWS S3, Twilio OTP  
- **Completion Date**: July 29, 2024  

---

## Links

- **GitHub Repo**: [GVR-DatingApp](https://github.com/RJRYT/GVR-DatingApp/)  
- **Live Demo**: *(Not deployed — prototype stage)*  

---

## Status

This project represents a **working prototype**, showcasing the core structure of a scalable dating app.  
While not fully production-ready, it demonstrates **secure authentication, cloud storage, and third-party API integrations**, making it a solid internship project milestone.  

