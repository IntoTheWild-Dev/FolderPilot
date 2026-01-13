const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script starting...');

try {
  // Expose protected methods that allow the renderer process to use
  // the ipcRenderer without exposing the entire object
  contextBridge.exposeInMainWorld('electronAPI', {
    // Folder operations
    selectFolder: () => {
      console.log('selectFolder called');
      return ipcRenderer.invoke('select-folder');
    },
    selectFilesFolder: () => {
      console.log('selectFilesFolder called');
      return ipcRenderer.invoke('select-files-folder');
    },
    selectSpecificFiles: () => {
      console.log('selectSpecificFiles called');
      return ipcRenderer.invoke('select-specific-files');
    },
    createFolders: (folderNames, basePath) => {
      console.log('createFolders called with:', folderNames, basePath);
      return ipcRenderer.invoke('create-folders', folderNames, basePath);
    },
    
    // File operations
    getFiles: (folderPath) => {
      console.log('getFiles called with:', folderPath);
      return ipcRenderer.invoke('get-files', folderPath);
    },
    renameFiles: (operations, basePath) => {
      console.log('renameFiles called with:', operations, basePath);
      return ipcRenderer.invoke('rename-files', operations, basePath);
    },
    renameFolders: (operations, basePath) => {
      console.log('renameFolders called with:', operations, basePath);
      return ipcRenderer.invoke('rename-folders', operations, basePath);
    },
    showItemInFolder: (fullPath) => {
      console.log('showItemInFolder called with:', fullPath);
      return ipcRenderer.invoke('show-item-in-folder', fullPath);
    },
    
    // Multiple folder selection
    selectMultipleFolders: () => {
      console.log('selectMultipleFolders called');
      return ipcRenderer.invoke('select-multiple-folders');
    },
    
    // Copy/Move operations
    copyFiles: (operations, targetFolders) => {
      console.log('copyFiles called with:', operations.length, 'operations to', targetFolders.length, 'targets');
      return ipcRenderer.invoke('copy-files', operations, targetFolders);
    },
    moveFiles: (operations, targetFolders) => {
      console.log('moveFiles called with:', operations.length, 'operations to', targetFolders.length, 'targets');
      return ipcRenderer.invoke('move-files', operations, targetFolders);
    },
    
    // Storage operations
    savePresets: (presets) => {
      console.log('savePresets called with:', presets.length, 'presets');
      return ipcRenderer.invoke('save-presets', presets);
    },
    loadPresets: () => {
      console.log('loadPresets called');
      return ipcRenderer.invoke('load-presets');
    },
    saveCustomTags: (tags) => {
      console.log('saveCustomTags called with:', tags.length, 'tags');
      return ipcRenderer.invoke('save-custom-tags', tags);
    },
    loadCustomTags: () => {
      console.log('loadCustomTags called');
      return ipcRenderer.invoke('load-custom-tags');
    },
    
    // Utility functions
    path: {
      join: (...args) => require('path').join(...args),
      parse: (pathString) => require('path').parse(pathString),
      extname: (pathString) => require('path').extname(pathString),
      basename: (pathString) => require('path').basename(pathString),
      dirname: (pathString) => require('path').dirname(pathString),
      sep: require('path').sep
    }
  });

  console.log('Preload script loaded successfully');
} catch (error) {
  console.error('Error in preload script:', error);
}