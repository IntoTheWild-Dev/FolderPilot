# FolderPilot

Professional folder and file management application for Mac and Windows.

---

## 📥 **DOWNLOAD FOLDERPILOT**

### **For Mac Users**

**Apple Silicon (M1/M2/M3/M4):**
➡️ **[Download for Mac (Apple Silicon)](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.4/FolderPilot-1.0.4-arm64.dmg)**

**Intel Macs:**
➡️ **[Download for Mac (Intel)](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.4/FolderPilot-1.0.4.dmg)**

### **For Windows Users**

➡️ **[Download for Windows](https://github.com/IntoTheWild-Dev/FolderPilot/releases/download/v1.0.4/FolderPilot-Setup-1.0.4.exe)**

---

## Installation

**Mac:**
1. Download the appropriate DMG file for your Mac
2. Open the DMG file
3. Drag FolderPilot to your Applications folder
4. **Important - First Launch:** See "macOS Security Note" below before launching
5. Launch from Applications

**Windows:**
1. Download the EXE installer
2. Run the installer
3. Follow the installation wizard
4. Launch from Start menu

---

## macOS Security Note

When you first try to open FolderPilot on macOS, you'll see a message saying the app **"is damaged and can't be opened."** This is normal for apps not signed with an Apple Developer certificate ($99/year).

### How to Install (One-Time Setup)

**After dragging FolderPilot to Applications, open Terminal and run:**

```bash
xattr -cr /Applications/FolderPilot.app
```

**That's it!** Now double-click FolderPilot to open it normally.

<details>
<summary>📋 How to open Terminal</summary>

1. Press **Cmd + Space** to open Spotlight
2. Type **Terminal** and press Enter
3. Copy and paste the command above, then press Enter

</details>

### Step 2: Grant Full Disk Access (If Needed)

If FolderPilot cannot access certain folders (Desktop, Documents, Downloads, etc.), you may need to grant Full Disk Access:

1. Go to **System Settings** > **Privacy & Security** > **Full Disk Access**
2. Click the **+** button
3. Navigate to **Applications** and select **FolderPilot**
4. Toggle FolderPilot **on** in the list

**Note:** You only need to do these steps once. After the first successful setup, macOS will remember your choices.

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
