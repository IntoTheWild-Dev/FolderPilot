# FolderPilot Template System Guide

## Overview
FolderPilot now supports editable folder templates that allow you to create, edit, and share standardized folder structures across your team.

## Features

### ✅ **Template Management**
- Create new templates from scratch
- Edit existing templates 
- Delete templates you no longer need
- Drag & drop reordering of folders
- Bulk import folder lists

### ✅ **Team Collaboration**  
- Export templates as JSON files
- Import templates from JSON files
- Share templates across team members
- Version control friendly JSON format

### ✅ **Easy Integration**
- Templates appear in main folder creation workflow
- One-click template application
- Templates show in presets section with TEMPLATE badge
- Search and filter templates

## How to Use

### Creating a Template

1. **Quick Access**: Click "Create Template" button in folder creation section
2. **Alternative**: Go to Presets section → Select "Folder Structure" → Create new preset

**Template Editor Features:**
- **Name & Description**: Give your template a clear name and description
- **Add Folders**: Type folder names and click "Add" (or press Enter)
- **Bulk Import**: Paste multiple folder names (one per line) and import all at once
- **Reorder**: Drag folders up/down or use arrow buttons
- **Remove**: Click × to remove folders you don't need

### Using a Template

1. **From Folder Creation**: 
   - Click "Load Template" → Select template → Click "Apply Template"
   - Choose your destination folder
   - Click "Create Folders"

2. **From Presets**: 
   - Go to Presets section → Click template with TEMPLATE badge
   - Template automatically loads in folder creation section

### Sharing Templates

**Export Templates:**
```bash
# Creates: folderpilot-templates-2025-08-19.json
Click "Export Templates" button
```

**Import Templates:**  
```bash
# Upload any .json template file
Click "Import Templates" button
```

## Sample Templates Included

The `sample-templates.json` file includes:

1. **European Languages** - Standard EU language codes (14 folders)
2. **Slavic Languages** - Eastern European subset (8 folders)  
3. **Project Structure** - Creative workflow folders with subfolders
4. **Client Deliverables** - Standard client project structure

## Template JSON Format

```json
{
  "id": 1692345600000,
  "name": "European Languages",
  "description": "Standard European language codes",
  "type": "folder_template",
  "folders": [
    "01_LAT", "02_BG", "03_CS", "04_HR", "05_HU"
  ],
  "createdAt": "2025-08-19T10:00:00.000Z",
  "isEditable": true
}
```

## Team Workflow

### For Template Creators:
1. Create template in FolderPilot
2. Export as JSON
3. Share JSON file with team (email, Slack, Git repo)
4. Document template purpose and usage

### For Template Users:
1. Import received JSON file
2. Template appears in Load Template dialog
3. Apply template to create folder structure
4. Customize as needed for specific projects

## Tips & Best Practices

### ✅ **Naming Conventions**
- Use clear, descriptive template names
- Include version info if templates evolve
- Add detailed descriptions for team clarity

### ✅ **Folder Organization**
- Use numbered prefixes for ordering (01_, 02_)
- Use underscores instead of spaces for compatibility
- Create nested folders with forward slashes (Assets/Images)

### ✅ **Template Management**
- Export templates regularly as backup
- Keep template library organized by project type
- Update templates based on team feedback

## Troubleshooting

**Template not appearing?**
- Check template has `type: "folder_template"` in JSON
- Verify JSON format is valid
- Try refreshing the app

**Import failed?**
- Ensure JSON file contains array of templates
- Check each template has required fields: name, folders
- Validate JSON syntax

**Template folders not creating?**
- Verify destination folder has write permissions
- Check folder names don't contain invalid characters
- Ensure template has at least one folder

## Support

For issues or feature requests, contact the development team or check the FolderPilot documentation.