---
title: "Minecraft Cat Adventure: Infinite Falling (2D)"
description: "A real-time Phaser + Matter.js survival game where live YouTube chat and keyboard commands directly control gameplay through a resilient command queue and cooldown system."
technologies: ["Phaser 3", "Matter.js", "React", "Vite", "Node.js", "Express", "SSE", "Web Worker", "YouTube Live Chat Integration"]
category: "Personal"
status: "Active"
github: ""
live: "https://www.youtube.com/channel/UCHbfnbCUy3eKoIDmln6jnnw"
image: "/images/projects/minecraft-cat-adventure.png"
featured: true
date: "2026-02-28"
---

# Minecraft Cat Adventure: Infinite Falling (2D)

## Overview

**Minecraft Cat Adventure** is a real-time infinite falling survival game built with **Phaser 3** and **Matter.js**.  
The player controls a cat descending through a procedurally streamed vertical world filled with mobs, bosses, weather events, explosions, fluids, and dynamic hazards.

The project also includes **live command integration** from both keyboard input and **YouTube live chat**, allowing viewers to directly affect gameplay in real time through a resilient command pipeline with queueing, retries, and cooldown synchronization.

## Features

- **Infinite Vertical World Streaming**: Chunk-based procedural generation for continuous downward gameplay.
- **Physics-Driven Core Gameplay**: Matter.js powers movement, collisions, combat impact, and explosions.
- **Advanced Mob & Boss Systems**: Targeting, combat logic, spawn controls, and boss encounters.
- **Live Command Integration**:
- Keyboard command combos for player-side control.
- YouTube live chat command ingestion via SSE + worker pipeline.
- Queue management, retry handling, and shared cooldown synchronization.
- **Abilities & Effects**: Fire Charge, Arrow Barrage, magnet mode, speed modes, and weather overrides.
- **Environmental Engine**: Day/Night/Rain/Snow/Thunder cycles with fluid behavior (water/lava/fire interactions).
- **Explosion Events**: TNT, Mega TNT, Nuke, Bolt, and MegaBolt systems.
- **XP Progression System**: XP orb collection with level progression UI.
- **Real-Time Overlay UI**:
- Cooldown and command status panel.
- Telemetry HUD (fall time, Y-level, weather, speed, boss state).
- Live shoutout queue animations for first-time chat participants.
- **Production Live Backend**:
- Hybrid chat provider strategy (scraper-first with API fallback).
- Session-based SSE broadcast architecture.
- Daily rotating logs and error artifacts.
- Secured advanced live-chat simulation endpoint/UI for testing.

## Tech Stack

- **Game Engine & Rendering**: Phaser 3
- **Physics**: Matter.js
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Live Systems**: SSE, Web Worker command processing pipeline
- **Integrations**: YouTube live chat ingestion (scraper + API fallback)
- **Architecture Focus**: Real-time event handling, queue/cooldown orchestration, fault tolerance, performance optimization, modular gameplay systems

## Project Status

- **Current Status**: Active development
- **Build Type**: Real-time interactive game + live command backend
- **Deployment**: Private / internal live setup

## Notes

This project demonstrates a strong **real-time systems architecture** where gameplay and live audience interaction are tightly synchronized.  
It combines game development, backend event streaming, and fault-tolerant command execution into a single production-oriented system.
