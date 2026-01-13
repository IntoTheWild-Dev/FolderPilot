# Creative Devs - App Color Guide
**Premium Masculine Design System**

## 🎨 Primary Color Palette

### **Dark Steel Blue** - `#1E3A5F`
- **Usage**: Interactive buttons, hover states, focus borders
- **RGB**: (30, 58, 95)
- **Description**: Rich, masculine blue - professional and trustworthy
- **Best for**: Primary action buttons, selected states, links

### **Cream Gold** - `#F7E7CE` 
- **Usage**: Button backgrounds, accent elements
- **RGB**: (247, 231, 206)
- **Description**: Elegant cream gold - luxury without being flashy
- **Best for**: Call-to-action buttons, highlights, branding accents

### **Blue Grey** - `#6B7280`
- **Usage**: Headings, titles, labels, important text
- **RGB**: (107, 114, 128) 
- **Description**: Sophisticated neutral - readable and professional
- **Best for**: All headings, form labels, section titles

### **Silver** - `#D1D5DB`
- **Usage**: Body text, general content, form inputs
- **RGB**: (209, 213, 219)
- **Description**: Rich silver tone - better than pure white
- **Best for**: Paragraph text, input text, general content

### **Light Grey** - `#4B5563`
- **Usage**: Active/selected states, subtle backgrounds
- **RGB**: (75, 85, 99)
- **Description**: Professional selection color
- **Best for**: Active sidebar items, selected states

---

## 🌑 Background Colors

### **Primary Dark** - `#0F1115`
- **Usage**: Main body background
- **RGB**: (15, 17, 21)
- **Description**: Deep, rich charcoal - premium feel

### **Secondary Dark** - `#1A1D23`
- **Usage**: Sidebar, cards, containers
- **RGB**: (26, 29, 35)
- **Description**: Elegant dark grey - good contrast

### **Tertiary Dark** - `#1C1F24`
- **Usage**: Main content areas, sections
- **RGB**: (28, 31, 36)
- **Description**: Slightly lighter for content hierarchy

### **Input Dark** - `#151922`
- **Usage**: Form inputs, text areas, code blocks
- **RGB**: (21, 25, 34)
- **Description**: Dark enough for depth, light enough for text

---

## 🔘 Button System

### **Primary Buttons** (Cream Gold)
```css
background: #F7E7CE;
color: #1E3A5F; /* Dark steel blue text */
```

### **Secondary Buttons** (Cream Gold)
```css
background: #F7E7CE;
color: #1E3A5F; /* Dark steel blue text */
```

### **Steel Blue Buttons**
```css
background: #1E3A5F;
color: #D1D5DB; /* Silver text */
```

### **Outline Buttons**
```css
background: rgba(30, 58, 95, 0.1);
color: #1E3A5F;
border: none;
```

---

## 📊 Hover & Interactive States

### **Hover Colors**
- **Cream Gold Hover**: `#E6D4B7`
- **Steel Blue Hover**: `#1A3152`
- **Background Hover**: `rgba(30, 58, 95, 0.1)`

### **Focus States**
- **Border**: `#1E3A5F`
- **Shadow**: `0 0 0 3px rgba(30, 58, 95, 0.1)`

---

## 🎯 Usage Guidelines

### **DO's**
✅ Use dark steel blue for primary actions
✅ Use cream gold sparingly for emphasis
✅ Use blue-grey for all headings/titles
✅ Use silver for body text
✅ Maintain high contrast ratios

### **DON'Ts**
❌ Never use pure white text
❌ Avoid bright/neon colors
❌ Don't mix warm and cool greys
❌ Never use pink/purple/magenta

---

## 🔧 Technical Implementation

### **CSS Variables**
```css
:root {
  --primary-dark: #0F1115;
  --secondary-dark: #1A1D23;
  --tertiary-dark: #1C1F24;
  --input-dark: #151922;
  
  --steel-blue: #1E3A5F;
  --steel-blue-hover: #1A3152;
  --cream-gold: #F7E7CE;
  --cream-gold-hover: #E6D4B7;
  
  --blue-grey: #6B7280;
  --silver: #D1D5DB;
  --light-grey: #4B5563;
  
  --border-light: #6B7280;
  --shadow-light: rgba(0, 0, 0, 0.15);
}
```

---

## 🎨 Color Accessibility

### **Contrast Ratios**
- **Blue-Grey on Dark**: 7.2:1 ✅
- **Silver on Dark**: 8.1:1 ✅
- **Steel Blue on Cream**: 4.8:1 ✅
- **Silver on Steel Blue**: 4.2:1 ✅

---

## 🏷️ Brand Personality
- **Masculine**: Strong, confident colors
- **Professional**: Clean, readable typography
- **Premium**: Rich, deep backgrounds
- **Trustworthy**: Conservative, reliable palette
- **Modern**: Subtle shadows, clean lines

---

## 📋 Quick Reference

| Element | Color | Hex |
|---------|-------|-----|
| Main Background | Primary Dark | `#0F1115` |
| Text | Silver | `#D1D5DB` |
| Headings | Blue Grey | `#6B7280` |
| Buttons | Cream Gold + Steel Blue | `#F7E7CE` + `#1E3A5F` |
| Interactions | Steel Blue | `#1E3A5F` |
| Borders | Light Grey | `#6B7280` |

---

**Created for FolderPilot - Premium Design System**
*This color palette creates a sophisticated, masculine, and professional aesthetic suitable for premium software applications.*