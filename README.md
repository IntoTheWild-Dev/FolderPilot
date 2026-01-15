# FolderPilot

Professional folder and file management application for Mac and Windows.

---

## 📥 **DOWNLOAD FOLDERPILOT**

### **For Mac Users**

**Apple Silicon (M1/M2/M3/M4):**
➡️ **[Download for Mac (Apple Silicon)](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.5/FolderPilot-1.0.5-arm64.dmg)**

**Intel Macs:**
➡️ **[Download for Mac (Intel)](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.5/FolderPilot-1.0.5.dmg)**

### **For Windows Users**

➡️ **[Download for Windows](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.5/FolderPilot-Setup-1.0.5.exe)**

---

## Installation

### Windows
1. Download the EXE installer
2. Run the installer and follow the wizard
3. Launch from Start menu

### Mac ⚠️ IMPORTANT - READ THIS FIRST

macOS will show **"FolderPilot is damaged and can't be opened"** - this is normal! This happens because the app is not signed with an Apple Developer certificate ($99/year). Here's how to install:

**Step 1: Download and move to Applications**
1. Download the DMG file for your Mac (Apple Silicon or Intel)
2. Open the DMG and drag FolderPilot to your Applications folder

**Step 2: Run this command in Terminal (required)**

Open Terminal and paste this command:

```bash
xattr -cr /Applications/FolderPilot.app
```

> **How to open Terminal:** Press `Cmd + Space`, type `Terminal`, press Enter. Then paste the command above and press Enter.

**Step 3: Open the app**

Double-click FolderPilot in Applications - it will now open normally!

**Step 4: Grant Full Disk Access (if needed)**

If FolderPilot can't access certain folders (Desktop, Documents, etc.):

1. Go to **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **+** and add **FolderPilot**
3. Toggle it **on**

> ✅ You only need to do these steps once. After setup, macOS remembers your choices.

---

## Features

- Folder creation and management
- File renaming with preview
- Multiple folder operations
- Custom templates and presets
- Cross-platform support (Mac/Windows)
- Automatic updates

## Documentation

- [Template System Guide](TEMPLATE_GUIDE.md) - Learn how to create, edit, and share folder templates


## Releasing a New Version

The app includes automatic update functionality. When users have the app installed, they will automatically be notified of new versions.

### How Auto-Update Works

1. When users open the app, it checks for updates automatically
2. Users get a notification asking if they want to download
3. The update downloads in the background
4. When complete, users can restart to install the new version

Updates are seamless and require just one click.

## License

Copyright © 2026 IntoTheWild-Dev. All rights reserved.

This software is proprietary and licensed for authorized users only. See [LICENSE](LICENSE) for full terms.

For licensing inquiries, contact your account manager.
