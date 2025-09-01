---
title: "E2EE Chat — End-to-End Encrypted Chat App"
description: "A secure real-time MERN chat app with true end-to-end encryption using client-side RSA-OAEP, built as a personal project."
technologies: ["React", "Tailwind CSS", "Node.js", "Express", "Socket.IO", "MongoDB", "Web Crypto API (RSA-OAEP)"]
category: "Personal Project"
status: "Completed"
github: "https://github.com/RJRYT/e2ee-chat"
live: "https://e2ee-chat-six.vercel.app/"
image: "/images/projects/e2ee-chat.png"
featured: true
date: "2025-07-02"
---

# E2EE Chat — End-to-End Encrypted Chat App

**E2EE Chat** is a secure, real-time messaging application built on the **MERN stack** with **true end-to-end encryption**.  
Messages and media are encrypted in the client browser using RSA-OAEP keys, ensuring private keys never leave the device.  

This was built as a **personal project** to explore secure communication systems.

---

## Key Features

- 🔒 **End-to-End Encryption:** Client-side RSA-OAEP for all messages & media.  
- ⚡ **Real-Time Messaging:** Socket.IO for low-latency communication.  
- 📁 **Encrypted Media Sharing:** Secure transmission of images & videos.  
- 🗝️ **Per-User Keys:** Private keys remain fully client-side.  
- 🔄 **Offline Resilience:** Queued messages auto-sync on reconnect.  

---

## Tech Stack & Architecture

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | React, React Router, Tailwind CSS |
| Backend    | Node.js, Express                  |
| Real-Time  | Socket.IO                         |
| Database   | MongoDB                           |
| Encryption | Web Crypto API (RSA-OAEP)         |

**Message Flow:**  
1. Browser generates RSA key pair.  
2. Public key stored in MongoDB; private key never leaves client.  
3. Sender encrypts with recipient’s public key; sends via Socket.IO.  
4. Recipient decrypts with private key and displays plaintext.  

---

## Project Notes

- Developed as a **personal security-focused experiment**.  
- Fully functional with **real-time encrypted messaging**.  
- Open-source under the **MIT License**.  

📅 Completed: **July 2, 2025**  
