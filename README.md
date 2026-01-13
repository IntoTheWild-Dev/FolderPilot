# FolderPilot

Electron-based folder and file management application for Mac and Windows.

## Features

- Folder creation and management
- File renaming with preview
- Multiple folder operations
- Custom templates and presets
- Cross-platform support (Mac/Windows)
- Automatic updates

## Documentation

- [Template System Guide](TEMPLATE_GUIDE.md) - Learn how to create, edit, and share folder templates
- [Color Guide](FolderPilot-Color-Guide.md) - Design system and color palette reference

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

For development mode with DevTools:

```bash
npm run dev
```

### Building the App

Build for Mac:
```bash
npm run build-mac
```

Build for Windows:
```bash
npm run build-win-simple
```

## Releasing a New Version

The app includes automatic update functionality. When users have the app installed, they will automatically be notified of new versions.

### How to Create a Release

1. **Update the version** in `package.json`:
   ```json
   "version": "1.1.0"
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Version 1.1.0: Add new features"
   git push
   ```

3. **Create and push a version tag**:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

4. **GitHub Actions will automatically**:
   - Build the app for Mac and Windows
   - Create a GitHub Release
   - Upload the installers (DMG and EXE)
   - Make them available for auto-update

### How Auto-Update Works

1. **For Users**: When they open the app, it checks for updates automatically
2. **Update Available**: They get a notification asking if they want to download
3. **Download**: The update downloads in the background
4. **Install**: When complete, they can restart to install the new version

## Distribution

Users can download the latest version from:
https://github.com/IntoTheWild-Dev/FolderPilot/releases

### For Mac Users
- Download the `.dmg` file
- Drag FolderPilot to Applications folder
- Updates will be automatic going forward

### For Windows Users
- Download the `.exe` installer
- Run the installer
- Updates will be automatic going forward

## License

All rights reserved.
