<p align="center"><img src="./app/assets/images/SealCircle.png" width="150px" height="150px" alt="aventium softworks"></p>

<h1 align="center">PalaDrill Launcher</h1>

<p align="center">Join PalaDrill server without installing Java, Forge, or other mods. We'll handle that for you.</p>

#### Like the PalaDrill project? Leave a ⭐ star on the repository!

## Downloads

You can download from [GitHub Releases](https://github.com/PalaDrill-Staff/PalaDrill-Launcher/releases)


**Supported Platforms**

If you download from the [Releases](https://github.com/PalaDrill-Staff/PalaDrill-Launcher/releases) tab, select the installer for your system.

| Platform | File |
| -------- | ---- |
| Windows x64 | `PalaDrill-setup-VERSION.exe` |
| macOS x64 | `PalaDrill-setup-VERSION.dmg` |
| macOS arm64 | `PalaDrill-setup-VERSION-arm64.dmg` |
| Linux x64 | `PalaDrill-setup-VERSION.AppImage` |

### Getting Started

**System Requirements**

* [Node.js](https://nodejs.org) >14

---

**Clone and Install Dependencies**

```console
> git clone https://github.com/PalaDrill-Staff/PalaDrill-Launcher.git
> cd PalaDrill-Launcher
> npm install
```
**Build Installers**

To build for your current platform.

```console
> npm run dist
```

Build for a specific platform.

| Platform    | Command              |
| ----------- | -------------------- |
| Windows x64 | `npm run dist:win`   |
| macOS       | `npm run dist:mac`   |
| Linux x64   | `npm run dist:linux` |

Builds for macOS may not work on Windows/Linux and vice-versa.

This adds two debug configurations.s

## Source on https://github.com/dscalzi/HeliosLauncher
