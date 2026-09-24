---
title: "SA-MP Socket Plugin — SSL-Free"
description: "A lightweight and minimal socket plugin for San Andreas Multiplayer (SA-MP) that provides TCP/UDP communication without OpenSSL dependencies on Windows and Linux."
technologies: ["C++", "Pawn (SAMP)", "TCP/UDP Sockets", "sampctl"]
category: "SAMP"
status: "Completed"
github: "https://github.com/RJRYT/samp-socket-plugin"
live: "https://packages.open.mp/packages/RJRYT/samp-socket-plugin"
image: "/images/projects/samp-socket-plugin.png"
featured: false
date: "2025-06-24"
---

# SA-MP Socket Plugin — SSL-Free

## Overview

SA-MP Socket Plugin (SSL-Free) is a lightweight socket plugin for San Andreas Multiplayer (SA-MP) servers that provides simple **TCP/UDP communication capabilities** without relying on OpenSSL.

The project was created as an SSL-free rebuild of the original BlueG Socket plugin, removing external OpenSSL dependencies such as `libcrypto`, `libeay32.dll`, and `ssleay32.dll`. This makes deployment simpler and helps avoid common runtime dependency issues on both Windows and Linux.

## Features

- Supports **TCP and UDP** socket communication.
- Built without OpenSSL or related external SSL libraries.
- Eliminates `libcrypto` dependency issues on Linux.
- Eliminates `libeay32.dll` and `ssleay32.dll` dependency issues on Windows.
- Lightweight and minimal.
- Supports both **Windows and Linux** server environments.
- Easy to compile from source.
- Compatible with most modern AMX-based SA-MP scripts.
- Useful for communicating with external backends such as **Node.js** and **Python** applications.
- Prebuilt binaries are available through GitHub Releases.
- Published as an Open.MP package through PawnDEX.

## Installation

### Windows

1. Download the latest `socket.dll` from the [GitHub Releases](https://github.com/RJRYT/samp-socket-plugin/releases) page.
2. Copy `socket.dll` into your SA-MP server's `plugins` folder.
3. Copy `socket.inc` into `pawno/include/`.
4. Add the plugin to your `server.cfg`:

```ini
plugins socket
```

### Linux

1. Download `socket.so` from the [GitHub Releases](https://github.com/RJRYT/samp-socket-plugin/releases) page.
2. Copy `socket.so` into your `plugins` folder.
3. Copy `socket.inc` into `pawno/include/`.
4. Add the plugin to your `server.cfg`:

```ini
plugins socket.so
```

Make sure the plugin has execute permissions:

```bash
chmod +x plugins/socket.so
```

## Usage

The plugin can be used directly from Pawn scripts to create and connect sockets:

```pawn
#include <socket>

new Socket:g_socket;

public OnGameModeInit()
{
    g_socket = socket_create(TCP);
    socket_connect(g_socket, "127.0.0.1", 7000);
}

public onSocketAnswer(Socket:id, data[], data_len)
{
    printf("[TCP Server] %s", data);
}
```

## Build

The project includes build support for both Linux and Windows.

### Linux

Requirements:

- `g++`
- `make`

Build with:

```bash
git clone https://github.com/RJRYT/samp-socket-plugin.git
cd samp-socket-plugin/socket
make
```

The generated plugin is available at:

```text
Release/socket.so
```

### Windows

Requirements:

- Visual Studio Build Tools
- MSBuild

Build with:

```bash
git clone https://github.com/RJRYT/samp-socket-plugin.git
msbuild "absolute\path\to\socket.vcxproj" /p:Configuration=Release /p:Platform=Win32
```

The generated plugin is available at:

```text
Release/socket.dll
```

## Release

The project was completed and released on **June 24, 2025**.

The first public release, **1.0.0**, provides prebuilt Windows and Linux binaries for easier installation.

[View Release 1.0.0](https://github.com/RJRYT/samp-socket-plugin/releases/tag/1.0.0)

## Open.MP Package

The plugin is also available through **Open.MP PawnDEX**:

[View package on PawnDEX](https://packages.open.mp/packages/RJRYT/samp-socket-plugin)

## Credits

- Original socket plugin by [pBlueG](https://github.com/pBlueG/Socket)
- SSL-free rebuild and cross-platform packaging by [RJRYT](https://github.com/RJRYT)

## Status

✅ Completed — Personal project finished and released on **June 24, 2025**.
