const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

let mainWindow;

// Auto-updater configuration
autoUpdater.logger = console;
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Window state management
const defaultWindowState = {
  width: 1200,
  height: 700,
  x: undefined,
  y: undefined,
  isMaximized: false
};

function getWindowState() {
  const stateFile = path.join(app.getPath('userData'), 'window-state.json');
  try {
    if (fsSync.existsSync(stateFile)) {
      const data = fsSync.readFileSync(stateFile, 'utf8');
      return { ...defaultWindowState, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Error reading window state:', error);
  }
  return defaultWindowState;
}

function saveWindowState() {
  if (!mainWindow) return;
  
  const state = {
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height,
    x: mainWindow.getBounds().x,
    y: mainWindow.getBounds().y,
    isMaximized: mainWindow.isMaximized()
  };
  
  const stateFile = path.join(app.getPath('userData'), 'window-state.json');
  try {
    fsSync.writeFileSync(stateFile, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving window state:', error);
  }
}

function createWindow() {
  const windowState = getWindowState();
  
  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    minWidth: 900,
    minHeight: 650,
    x: windowState.x,
    y: windowState.y,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset', // For macOS
    frame: true,
    show: false // Don't show until ready
  });

  // Restore maximized state
  if (windowState.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.loadFile('index.html');
  
  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('Window ready, preload script loaded');
  });
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Debug: Check if preload loaded
  mainWindow.webContents.once('dom-ready', () => {
    console.log('DOM ready in main process');
  });

  // Save window state on resize/move
  mainWindow.on('resize', saveWindowState);
  mainWindow.on('move', saveWindowState);
  mainWindow.on('maximize', saveWindowState);
  mainWindow.on('unmaximize', saveWindowState);
  
  // Save window state before closing
  mainWindow.on('close', saveWindowState);
}

// Auto-updater events
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info);
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available. Do you want to download it now?',
    buttons: ['Download', 'Later']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available:', info);
});

autoUpdater.on('error', (err) => {
  console.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let message = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`;
  console.log(message);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded:', info);
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Ready',
    message: 'Update downloaded. The application will restart to install the update.',
    buttons: ['Restart Now', 'Later']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall(false, true);
    }
  });
});

function checkForUpdates() {
  // Only check for updates in production
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.checkForUpdates();
  }
}

app.whenReady().then(() => {
  createWindow();
  // Check for updates 3 seconds after app start
  setTimeout(checkForUpdates, 3000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for file operations
ipcMain.handle('select-folder', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Select Folder Location'
    });
    console.log('select-folder result:', result);
    return result;
  } catch (error) {
    console.error('Error in select-folder:', error);
    return { canceled: true, error: error.message };
  }
});

ipcMain.handle('select-files-folder', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Select Folder to Rename Files'
    });
    console.log('select-files-folder result:', result);
    return result;
  } catch (error) {
    console.error('Error in select-files-folder:', error);
    return { canceled: true, error: error.message };
  }
});

ipcMain.handle('select-specific-files', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'multiSelections'],
      title: 'Select Specific Files to Rename',
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'] },
        { name: 'Videos', extensions: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm'] },
        { name: 'Documents', extensions: ['pdf', 'doc', 'docx', 'txt', 'rtf'] },
        { name: 'Audio', extensions: ['mp3', 'wav', 'flac', 'aac', 'ogg'] }
      ]
    });
    console.log('select-specific-files result:', result);
    return result;
  } catch (error) {
    console.error('Error in select-specific-files:', error);
    return { canceled: true, error: error.message };
  }
});

ipcMain.handle('create-folders', async (event, folderNames, basePath) => {
  console.log('create-folders called with:', folderNames, basePath);
  try {
    const results = [];
    for (const folderName of folderNames) {
      if (folderName.trim()) {
        const folderPath = path.join(basePath, folderName.trim());
        try {
          await fs.mkdir(folderPath, { recursive: true });
          results.push({ name: folderName, success: true });
          console.log('Created folder:', folderPath);
        } catch (error) {
          console.error('Error creating folder:', folderPath, error);
          results.push({ name: folderName, success: false, error: error.message });
        }
      }
    }
    console.log('create-folders results:', results);
    return { success: true, results };
  } catch (error) {
    console.error('create-folders error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-files', async (event, folderPath) => {
  console.log('get-files called with:', folderPath);
  try {
    const items = await fs.readdir(folderPath);
    const fileDetails = [];
    
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      try {
        const stats = await fs.stat(itemPath);
        fileDetails.push({
          name: item,
          path: itemPath,
          extension: path.extname(item),
          size: stats.size,
          modified: stats.mtime,
          isDirectory: stats.isDirectory()
        });
      } catch (error) {
        console.error(`Error getting stats for ${item}:`, error);
      }
    }
    
    console.log('get-files returning:', fileDetails.length, 'items');
    return { success: true, files: fileDetails };
  } catch (error) {
    console.error('get-files error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('rename-files', async (event, operations, basePath) => {
  console.log('rename-files called with:', operations.length, 'operations');
  try {
    const results = [];
    
    for (const operation of operations) {
      try {
        await fs.rename(operation.oldPath, operation.newPath);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName, 
          success: true 
        });
        console.log('Renamed:', operation.oldName, '->', operation.newName);
      } catch (error) {
        console.error('Error renaming file:', operation.oldName, error);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    console.log('rename-files results:', results);
    return { success: true, results };
  } catch (error) {
    console.error('rename-files error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('show-item-in-folder', async (event, fullPath) => {
  try {
    const { shell } = require('electron');
    shell.showItemInFolder(fullPath);
    return { success: true };
  } catch (error) {
    console.error('show-item-in-folder error:', error);
    return { success: false, error: error.message };
  }
});

// Rename folders handler
ipcMain.handle('rename-folders', async (event, operations, basePath) => {
  console.log('rename-folders called with:', operations.length, 'operations');
  try {
    const results = [];
    
    for (const operation of operations) {
      try {
        await fs.rename(operation.oldPath, operation.newPath);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName, 
          success: true 
        });
        console.log('Renamed folder:', operation.oldName, '->', operation.newName);
      } catch (error) {
        console.error('Error renaming folder:', operation.oldName, error);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    console.log('rename-folders results:', results);
    return { success: true, results };
  } catch (error) {
    console.error('rename-folders error:', error);
    return { success: false, error: error.message };
  }
});

// Storage handlers for presets
ipcMain.handle('save-presets', async (event, presets) => {
  try {
    const userDataPath = app.getPath('userData');
    const presetsFile = path.join(userDataPath, 'presets.json');
    await fs.writeFile(presetsFile, JSON.stringify(presets, null, 2));
    console.log('Presets saved to:', presetsFile);
    return { success: true };
  } catch (error) {
    console.error('Error saving presets:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-presets', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const presetsFile = path.join(userDataPath, 'presets.json');
    
    if (fsSync.existsSync(presetsFile)) {
      const data = await fs.readFile(presetsFile, 'utf8');
      const presets = JSON.parse(data);
      console.log('Presets loaded from:', presetsFile, '- Count:', presets.length);
      return { success: true, presets };
    } else {
      console.log('No presets file found, returning empty array');
      return { success: true, presets: [] };
    }
  } catch (error) {
    console.error('Error loading presets:', error);
    return { success: false, error: error.message, presets: [] };
  }
});

// Multiple folder selection
ipcMain.handle('select-multiple-folders', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'multiSelections'],
      title: 'Select Multiple Folders'
    });
    console.log('select-multiple-folders result:', result);
    return result;
  } catch (error) {
    console.error('Error in select-multiple-folders:', error);
    return { canceled: true, error: error.message };
  }
});

// Custom tags storage
ipcMain.handle('save-custom-tags', async (event, tags) => {
  try {
    const userDataPath = app.getPath('userData');
    const tagsFile = path.join(userDataPath, 'custom-tags.json');
    await fs.writeFile(tagsFile, JSON.stringify(tags, null, 2));
    console.log('Custom tags saved to:', tagsFile);
    return { success: true };
  } catch (error) {
    console.error('Error saving custom tags:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-custom-tags', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const tagsFile = path.join(userDataPath, 'custom-tags.json');
    
    if (fsSync.existsSync(tagsFile)) {
      const data = await fs.readFile(tagsFile, 'utf8');
      const tags = JSON.parse(data);
      console.log('Custom tags loaded from:', tagsFile, '- Count:', tags.length);
      return { success: true, tags };
    } else {
      console.log('No custom tags file found, using defaults');
      return { success: true, tags: null };
    }
  } catch (error) {
    console.error('Error loading custom tags:', error);
    return { success: false, error: error.message, tags: null };
  }
});

// Copy/Move files to multiple locations
ipcMain.handle('copy-files', async (event, operations, targetFolders) => {
  console.log('copy-files called with:', operations.length, 'operations to', targetFolders.length, 'targets');
  try {
    const results = [];
    
    for (const targetFolder of targetFolders) {
      for (const operation of operations) {
        try {
          const targetPath = path.join(targetFolder, operation.newName);
          await fs.copyFile(operation.oldPath, targetPath);
          results.push({ 
            oldName: operation.oldName, 
            newName: operation.newName,
            targetFolder: targetFolder,
            success: true 
          });
          console.log('Copied:', operation.oldName, 'to', targetFolder);
        } catch (error) {
          console.error('Error copying file:', operation.oldName, 'to', targetFolder, error);
          results.push({ 
            oldName: operation.oldName, 
            newName: operation.newName,
            targetFolder: targetFolder,
            success: false, 
            error: error.message 
          });
        }
      }
    }
    
    console.log('copy-files results:', results);
    return { success: true, results };
  } catch (error) {
    console.error('copy-files error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('move-files', async (event, operations, targetFolders) => {
  console.log('move-files called with:', operations.length, 'operations to', targetFolders.length, 'targets');
  try {
    const results = [];
    
    // For move operations, we'll copy to all targets except the last one, then move to the last one
    const copyTargets = targetFolders.slice(0, -1);
    const moveTarget = targetFolders[targetFolders.length - 1];
    
    // Copy to all targets except the last
    for (const targetFolder of copyTargets) {
      for (const operation of operations) {
        try {
          const targetPath = path.join(targetFolder, operation.newName);
          await fs.copyFile(operation.oldPath, targetPath);
          results.push({ 
            oldName: operation.oldName, 
            newName: operation.newName,
            targetFolder: targetFolder,
            operation: 'copy',
            success: true 
          });
          console.log('Copied:', operation.oldName, 'to', targetFolder);
        } catch (error) {
          console.error('Error copying file:', operation.oldName, 'to', targetFolder, error);
          results.push({ 
            oldName: operation.oldName, 
            newName: operation.newName,
            targetFolder: targetFolder,
            operation: 'copy',
            success: false, 
            error: error.message 
          });
        }
      }
    }
    
    // Move to the final target
    for (const operation of operations) {
      try {
        const targetPath = path.join(moveTarget, operation.newName);
        await fs.rename(operation.oldPath, targetPath);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName,
          targetFolder: moveTarget,
          operation: 'move',
          success: true 
        });
        console.log('Moved:', operation.oldName, 'to', moveTarget);
      } catch (error) {
        console.error('Error moving file:', operation.oldName, 'to', moveTarget, error);
        results.push({ 
          oldName: operation.oldName, 
          newName: operation.newName,
          targetFolder: moveTarget,
          operation: 'move',
          success: false, 
          error: error.message 
        });
      }
    }
    
    console.log('move-files results:', results);
    return { success: true, results };
  } catch (error) {
    console.error('move-files error:', error);
    return { success: false, error: error.message };
  }
});