# Greeting Card Maker 

A modern, feature-rich web application for creating, customizing, and sharing beautiful greeting cards with advanced text styling and design capabilities.

##  Features

### Core Functionality
-  **Template Library** - Choose from a variety of pre-designed card templates for different occasions
-  **Interactive Canvas Editor** - Intuitive drag-and-drop interface for card customization
-  **PDF Export** - Download cards in high-quality printable PDF format (5x7 inches)
-  **Image Export** - Export cards as PNG images
-  **Email eCards** - Send digital cards directly via email
-  **Save & Load** - Save your designs locally and edit them later
-  **Multiple Occasions** - Birthday, Christmas, Anniversary, Thank You, and more

### Advanced Text Features
-  **Rich Text Editing** - Add and customize text with font family, size, color, bold, and italic
-  **Art Text System** - 8+ preset art text styles with customizable effects:
  - Gradient Basic
  - Neon Glow (with adjustable blur intensity)
  - Metal Shine
  - Fire Effect
  - Rainbow Text
  - Vintage Retro
  - Crystal Glass
  - Comic Style
-  **Advanced Text Effects**:
  - Custom font upload (TTF, OTF, WOFF, WOFF2)
  - Image texture backgrounds for art text
  - Dynamic color synchronization (text, shadows, filters, and glow effects)
  - CSS animations (glow, bounce, pulse, rainbow, flicker)
  - Transform effects (rotate, scale, skew)
  - Filter effects (blur, brightness, contrast)
  - Text decorations (underline, overline, line-through)
  - Letter spacing and line height controls

### Design Elements
-  **Image Upload** - Add custom images to cards with resize handles
-  **Shape Tools** - Add rectangles, circles, triangles, arrows, stars, and hearts
-  **Color Customization** - Full color picker for backgrounds, text, and shapes
-  **Background Images** - Upload images as card backgrounds with size, position, and repeat controls
-  **Element Positioning** - Drag-and-drop positioning with precise control
-  **Resize Elements** - Drag edges and corners to resize any element (text, images, shapes)
-  **Layer Management** - Bring to front, send to back, move forward/backward for all elements
-  **Undo/Redo** - Full history management for all edits

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2.0** - Modern UI library with hooks
- **React Router DOM 6.20.0** - Client-side routing and navigation
- **Vite 5.0.8** - Fast build tool and development server

### Libraries & Tools
- **html2canvas 1.4.1** - DOM to canvas conversion for export functionality
- **jsPDF 2.5.1** - PDF generation and export
- **Fabric.js 5.3.0** - Canvas manipulation (for future enhancements)
- **Lucide React 0.294.0** - Modern icon library

### Browser APIs
- **FontFace API** - Dynamic font loading for custom fonts
- **FileReader API** - Local file reading for images and fonts
- **LocalStorage API** - Client-side data persistence
- **Canvas API** - Image rendering and export

##  Project Structure

```
greeting-card-maker/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── editor/         # Editor-specific components (MODULARIZED)
│   │   │   ├── EditorToolbar.jsx        # Toolbar with add/export buttons
│   │   │   ├── EditorSidebar.jsx        # Sidebar container
│   │   │   ├── EditorCanvas.jsx         # Canvas area
│   │   │   ├── ElementRenderer.jsx      # Element rendering component
│   │   │   ├── BackgroundControls.jsx   # Background color controls
│   │   │   ├── TextPropertiesPanel.jsx  # Text element properties
│   │   │   ├── ArtTextPropertiesPanel.jsx  # Art text properties
│   │   │   ├── ImagePropertiesPanel.jsx # Image element properties
│   │   │   ├── ShapePropertiesPanel.jsx # Shape element properties
│   │   │   └── index.js                 # Barrel export
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer component
│   │   └── EmailModal.jsx  # Email sending modal
│   │
│   ├── hooks/              # Custom React hooks (NEW)
│   │   ├── useCardData.js      # Card data management
│   │   ├── useHistory.js        # Undo/redo functionality
│   │   ├── useDragAndDrop.js   # Drag and drop logic
│   │   ├── useNotification.js  # Notification system
│   │   ├── useGlowStyles.js    # Glow animation styles
│   │   ├── useFontManager.js   # Custom font management
│   │   └── useElementOperations.js  # Element CRUD operations
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page with dynamic background
│   │   ├── TemplateGallery.jsx  # Template browsing
│   │   ├── CardEditor.jsx   # Main editor (refactored, uses hooks)
│   │   └── SavedDesigns.jsx # Saved designs management
│   │
│   ├── templates/           # Template data
│   │   ├── templateData.js      # Card templates
│   │   └── artTextTemplates.js  # Art text style presets
│   │
│   ├── config/              # Configuration files
│   │   └── heroBackgrounds.js   # Hero section background images config
│   │
│   ├── utils/              # Utility functions (MODULARIZED)
│   │   ├── colorUtils.js       # Color manipulation utilities
│   │   ├── styleUtils.js       # Style generation utilities
│   │   ├── elementUtils.js     # Element creation utilities
│   │   ├── exportUtils.js      # PDF/image export
│   │   └── storageUtils.js     # LocalStorage management
│   │
│   ├── styles/             # Global styles
│   │   ├── App.css         # App-level styles
│   │   └── index.css       # Base styles
│   │
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Application entry point
│
├── public/                  # Static assets
│   └── image/               # Background images for hero section
├── package.json             # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

##  Architecture & Implementation

### Modular Architecture (Refactored)

The codebase has been refactored into a modular architecture with clear separation of concerns:

#### **1. Custom Hooks Layer** (`src/hooks/`)
Reusable hooks that encapsulate business logic and state management:

- **`useCardData`** - Manages card data loading and state
- **`useHistory`** - Handles undo/redo functionality
- **`useDragAndDrop`** - Manages drag and drop interactions
- **`useNotification`** - Notification system
- **`useGlowStyles`** - Dynamic glow animation style generation
- **`useFontManager`** - Custom font upload and management
- **`useElementOperations`** - Element CRUD operations and text editing

#### **2. Utility Functions Layer** (`src/utils/`)
Pure functions organized by domain:

- **`colorUtils.js`** - Color manipulation (hex to RGB, color synchronization)
- **`styleUtils.js`** - CSS style generation (outlines, glow animations)
- **`elementUtils.js`** - Element factory functions (create text, image, shape, art text)
- **`exportUtils.js`** - Export functionality (PDF, image)
- **`storageUtils.js`** - LocalStorage operations

#### **3. Component Layer** (`src/components/`)
UI components organized by feature and responsibility:

**Editor Components** (`src/components/editor/`):
- **`EditorToolbar.jsx`** - Toolbar with element addition and export buttons
- **`EditorSidebar.jsx`** - Sidebar container that conditionally renders property panels
- **`EditorCanvas.jsx`** - Canvas area that renders the card preview
- **`ElementRenderer.jsx`** - Renders different element types (text, art text, image, shapes)
- **`BackgroundControls.jsx`** - Background color picker and presets
- **`TextPropertiesPanel.jsx`** - Text element property controls
- **`ArtTextPropertiesPanel.jsx`** - Art text element property controls
- **`ImagePropertiesPanel.jsx`** - Image element property controls
- **`ShapePropertiesPanel.jsx`** - Shape element property controls

**Layout Components**:
- **`Header.jsx`**, **`Footer.jsx`** - Layout components
- **`EmailModal.jsx`** - Email functionality

#### **4. Page Components** (`src/pages/`)
Main page components that compose hooks and components:

- **`CardEditor.jsx`** - Main editor (now uses hooks for logic)

### Benefits of Modular Architecture

1. **Low Coupling** - Each module has a single responsibility, minimal dependencies
2. **High Cohesion** - Related functionality is grouped together logically
3. **Reusability** - Hooks and utilities can be reused across components
4. **Testability** - Pure functions and isolated hooks/components are easier to test
5. **Maintainability** - Clear structure makes code easier to understand and modify
6. **Scalability** - Easy to add new features without affecting existing code
7. **Component Isolation** - Each component can be developed and tested independently

### Component Architecture

#### 1. **App.jsx** - Root Component
- Sets up React Router with BrowserRouter
- Defines route structure:
  - `/` - HomePage
  - `/gallery/:category?` - TemplateGallery
  - `/editor/:templateId?` - CardEditor
  - `/saved` - SavedDesigns
- Provides Header and Footer layout

#### 2. **CardEditor.jsx** - Core Editor Component
The main editor has been refactored to use modular hooks and components:

**Before Refactoring:**
- Single large component (~1500 lines)
- All logic and UI mixed together
- Difficult to test and maintain
- High coupling between features

**After Refactoring:**
- Composes multiple custom hooks
- Uses utility functions for business logic
- UI split into focused components
- Clear separation of concerns
- Low coupling, high cohesion
- Easier to test and extend

**Key Refactoring Changes:**
- **State Management** - Extracted to hooks (`useCardData`, `useHistory`, `useElementOperations`, etc.)
- **Business Logic** - Moved to utilities (`colorUtils`, `styleUtils`, `elementUtils`)
- **UI Components** - Split into focused components:
  - `EditorToolbar` - Toolbar actions
  - `EditorSidebar` - Property panels container
  - `EditorCanvas` - Canvas rendering
  - Property panels for each element type
- **Element Rendering** - Extracted to `ElementRenderer` component
- **Color/Style Operations** - Modularized in utility functions

**State Management:**
- `cardData` - Complete card design state
- `selectedElement` - Currently selected element index
- `history` / `historyIndex` - Undo/redo system
- Element-specific states (text, images, shapes, art text)
- Drag-and-drop state management

**Key Features Implementation:**

**a) Element Management:**
- Add/delete/update elements (text, images, shapes, art text)
- Element selection and property editing
- Position tracking with absolute coordinates

**b) Drag & Drop System:**
- Mouse event handlers for element dragging
- Offset calculation for smooth dragging
- Global event listeners for drag operations

**c) Text Editing:**
- Rich text properties (font, size, color, bold, italic)
- Real-time content updates
- Custom font loading via FontFace API

**d) Art Text System:**
- Template-based art text creation
- Dynamic CSS property application
- Color synchronization across effects:
  - `updateTextShadowColor()` - Updates textShadow colors
  - `updateFilterColor()` - Updates filter colors
  - `generateGlowAnimation()` - Dynamic glow animation generation
- Custom font support for art text
- Image texture backgrounds
- Advanced CSS effects (animations, transforms, filters)

**e) History Management:**
- Immutable state updates
- History stack for undo/redo
- State snapshots on each edit

**f) Export Functionality:**
- PDF export via html2canvas + jsPDF
- Image export as PNG
- High-quality rendering (2x scale)

**g) Dynamic Style Generation:**
- Runtime CSS injection for custom animations
- Per-element unique animation IDs
- Color-aware effect updates

#### 3. **Template System**

**templateData.js:**
- Pre-defined card templates
- Template metadata (name, category, preview)
- Initial element configurations

**artTextTemplates.js:**
- 8 art text style templates
- Category-based organization
- Complete style configurations:
  - Typography (font, size, weight, style)
  - Colors (text, background, fill)
  - Effects (shadows, filters, animations)
  - Layout (spacing, alignment, padding)

#### 4. **Utility Modules**

**exportUtils.js:**
- `exportToPDF()` - Converts card to PDF (5x7 inches)
- `exportAsImage()` - Exports as PNG image
- `getCardDataURL()` - Gets base64 data URL for email

**storageUtils.js:**
- `saveDesign()` - Saves to LocalStorage
- `getSavedDesigns()` - Retrieves all saved designs
- `getDesignById()` - Gets specific design
- `deleteDesign()` - Removes design
- `clearAllDesigns()` - Clears all saved designs

### Key Implementation Patterns

#### 1. **Custom Hooks Pattern**
```javascript
// Encapsulate state and logic in reusable hooks
const { cardData, setCardData } = useCardData()
const { undo, redo, addToHistory, canUndo, canRedo } = useHistory(cardData)
const { isDragging, handleMouseDown, createMouseMoveHandler } = useDragAndDrop()
```

#### 2. **Utility Functions Pattern**
```javascript
// Pure functions for business logic
import { createTextElement } from '../utils/elementUtils'
import { updateTextShadowColor } from '../utils/colorUtils'
import { generateGlowAnimation } from '../utils/styleUtils'

const newElement = createTextElement({ content: 'Hello', fontSize: 24 })
```

#### 3. **State Management Pattern**
```javascript
// Immutable updates via hooks
const { updateElementAndHistory } = useElementOperations(...)
updateElementAndHistory(index, { color: '#FF0000' })
```

#### 4. **History Pattern** (via `useHistory` hook)
```javascript
// History management encapsulated in hook
const { addToHistory, undo, redo, canUndo, canRedo } = useHistory(initialState)
```

#### 5. **Dynamic Style Injection** (via `useGlowStyles` hook)
```javascript
// Automatic style generation
const customGlowStyle = useGlowStyles(cardData)
// Returns CSS string for all glow animations
```

#### 6. **Color Synchronization** (via `colorUtils`)
```javascript
// Utility functions for color operations
import { updateTextShadowColor, updateFilterColor } from '../utils/colorUtils'

const updatedShadow = updateTextShadowColor(element.textShadow, newColor)
const updatedFilter = updateFilterColor(element.filter, newColor)
```

#### 7. **Custom Font Loading** (via `useFontManager` hook)
```javascript
// Font management encapsulated
const { customFonts, uploadCustomFont } = useFontManager()
await uploadCustomFont(file, onSuccess, onError)
```

##  Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installation Steps

#### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required dependencies including:
- React 18
- React Router
- Fabric.js (canvas manipulation)
- jsPDF (PDF generation)
- html2canvas (rendering)
- Lucide React (icons)
- Vite (build tool)

#### 2. Start Development Server

After installation completes, start the development server:

```bash
npm run dev
```

The application will open automatically in your default browser at `http://localhost:3000`

#### 3. Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

#### 4. Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Troubleshooting

#### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

#### Module Not Found Errors

If you see module errors, try:
```bash
# Windows/Linux/Mac
rm -rf node_modules package-lock.json
npm install
```

#### Clear Browser Cache

If you see stale content, clear your browser cache or use:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

##  User Guide

### Getting Started

#### 1. Home Page

When you first open the application, you'll see:
- A hero section with introduction
- Feature highlights
- Category cards for different occasions

**Actions:**
- Click "Browse Templates" to see all available designs
- Click "Start from Blank" to create a card from scratch
- Click any category card to filter templates by occasion

#### 2. Template Gallery

Browse through our collection of pre-designed templates:

**Features:**
- Filter by category (Birthday, Christmas, Anniversary, etc.)
- Preview templates before editing
- Quick "Customize" button on each template

**Categories Available:**
-  Birthday - Colorful and fun birthday designs
-  Christmas - Festive holiday greetings
-  Anniversary - Romantic celebration cards
-  Thank You - Express gratitude
-  Congratulations - Celebrate achievements
-  Get Well Soon - Send healing wishes
-  Graduation - Honor achievements
-  Wedding - Celebrate love
-  Blank Canvas - Start from scratch

### Creating a Card

#### 1. Start from Template or Blank
   - Browse templates at `/gallery`
   - Or start with a blank card at `/editor`

#### 2. Card Editor Overview

**Toolbar (Top):**
- **Add Text** - Insert text elements
- **Add Art Text** - Insert styled art text with effects
- **Add Image** - Upload photos from your device
- **Add Shapes** - Add rectangles, circles, triangles, arrows, stars, hearts, lines
- **Undo/Redo** - Navigate through your changes
- **Save** - Store your design for later
- **PDF** - Download as printable PDF
- **Email** - Send as an eCard

**Sidebar (Left):**

**Background Section:**
- Color picker for custom colors
- Preset color buttons for quick selection
- Image background option with size, position, and repeat controls

**Element Properties** (when element is selected):
- Text Properties: content, font, size, color, style
- Art Text Properties: all text properties + effects, animations, transforms
- Image Properties: width, height, opacity
- Shape Properties: color, size, position, opacity
- Layer Order: bring to front, send to back, move forward/backward

**Canvas (Center):**
- **Click** elements to select them
- **Double-click** text to edit
- **Drag** elements to move them
- **Drag resize handles** to resize elements
- Selected elements show resize handles (8 handles around the element)

#### 3. Working with Elements

**Adding Text:**
1. Click "Add Text" button
2. A new text element appears saying "Double click to edit"
3. Click to select, then edit in the sidebar
4. Use the sidebar to customize:
   - Change the text content
   - Adjust font size (8-120px) and family
   - Change color
   - Make it bold or italic
5. Click "Apply Changes"

**Adding Art Text:**
1. Click "Add Art Text" and choose a style template
2. Select from 8 preset styles (Gradient, Neon, Metal, Fire, etc.)
3. Customize in the sidebar with advanced effects
4. Apply animations, transforms, and filters

**Adding Images:**
1. Click "Add Image" button
2. Select an image file from your computer
3. Image appears on the card
4. Click and drag to position
5. Drag resize handles to adjust size
6. Adjust opacity in the sidebar

**Adding Shapes:**
1. Click "Shapes" dropdown
2. Select shape type (rectangle, circle, triangle, arrow, star, heart, line)
3. Shape appears on the card
4. Customize color, size, and opacity in the sidebar

**Positioning and Resizing:**
- Click and drag elements on the canvas to move them
- Drag the resize handles (8 handles around selected elements) to resize
- Use precise controls in the sidebar for exact dimensions
- Elements can be resized independently (width and height)

**Managing Layers:**
- Use "Bring to Front" to move element to top layer
- Use "Send to Back" to move element to bottom layer
- Use "Bring Forward" to move one layer up
- Use "Send Backward" to move one layer down

#### 4. Customizing Background

**Color Background:**
1. Use the color picker for any color
2. Or click preset colors for quick changes
3. Gradients from templates are preserved

**Image Background:**
1. Select "Image" as background type in sidebar
2. Upload an image file
3. Adjust size (cover, contain, auto, stretch)
4. Set position (center, top, bottom, left, right, corners)
5. Choose repeat option (no-repeat, repeat, repeat-x, repeat-y)
6. Set fallback color for when image loads

#### 5. Saving Your Work

**Save Design:**
1. Click the "Save" button in the toolbar
2. Your design is saved to browser storage
3. Access it later from "Saved" page
4. You'll be redirected to the Saved Designs page

**Saved Designs Page:**
- View all your saved cards
- See when each was last saved
- **Edit** - Continue working on a design
- **Delete** - Remove unwanted designs
- Cards sorted by most recent first

#### 6. Exporting & Sharing

**Export as PDF:**
1. Click "PDF" button in toolbar
2. High-quality PDF is generated (7" x 5")
3. File automatically downloads
4. Print at home or professional printer

**Export as Image:**
1. Click "Export Image" button (if available)
2. PNG image is generated
3. File automatically downloads

**Send as eCard:**
1. Click "Email" button
2. Fill out the form:
   - **Recipient Email** (required)
   - Recipient Name
   - Your Name
   - Personal Message
3. Click "Send eCard"
4. Your default email client opens with the card

**Note:** Email currently uses `mailto:` links. In production, this would send directly through a server.

### Art Text Features

1. **Choose Template**
   - Select from 8 preset styles
   - Each has unique visual effects

2. **Customize**
   - Change text content
   - Adjust font family (including custom fonts)
   - Change color (synchronizes with all effects)
   - Upload background images
   - Adjust letter spacing
   - Select animations (glow, bounce, pulse, etc.)
   - Apply transforms and filters

3. **Glow Animation**
   - Select "glow" animation
   - Adjust blur intensity with slider
   - Color automatically matches text color

### Custom Fonts

1. Click "Upload Font" in art text properties
2. Select font file (TTF, OTF, WOFF, WOFF2)
3. Font is loaded and available in font selector
4. Apply to any text or art text element

### Tips & Tricks

**Design Tips:**
- **Keep it Simple** - Don't overcrowd the card
- **Contrast** - Use contrasting colors for text and background
- **Hierarchy** - Make the main message larger
- **White Space** - Leave breathing room around elements
- **Font Pairing** - Use max 2-3 different fonts

**Technical Tips:**
- **Undo/Redo** - Use these frequently while experimenting
- **Save Often** - Prevent losing your work
- **Browser Storage** - Don't clear browser data if you have unsaved work
- **Image Size** - Use reasonably sized images (under 2MB)
- **Preview** - Check how it looks before exporting

### Common Use Cases

**Birthday Card:**
1. Go to Templates → Birthday category
2. Choose "Colorful Birthday" or similar
3. Edit the name in the text
4. Add a photo if desired
5. Change colors to match their personality
6. Export as PDF or send via email

**Thank You Card:**
1. Browse Thank You templates
2. Select "Simple Thanks"
3. Customize the message
4. Keep it elegant and sincere
5. Save and send

**Custom Design:**
1. Start with "Blank Canvas"
2. Set your background color or image
3. Add text elements for your message
4. Upload images or add shapes
5. Experiment with fonts and colors
6. Resize and position elements as needed
7. Save your unique creation

### Troubleshooting

**Element Won't Select:**
- Make sure you're clicking directly on the element
- Try clicking the center of the element
- Check if another element is overlapping

**Can't Edit Text:**
- First click to select the element
- Then edit in the sidebar
- Don't forget to click "Apply Changes"

**Image Too Large:**
- Use image editing software to resize before upload
- Recommended: 800px × 600px or smaller
- Format: JPG, PNG, GIF

**Design Not Saving:**
- Check browser storage isn't full
- Try a different browser
- Export as PDF as backup

**PDF Quality Issues:**
- Use higher resolution images
- Avoid very small text
- Check preview before exporting

**Resize Handles Not Appearing:**
- Make sure an element is selected
- Check that the element is fully visible on canvas
- Try clicking the element again

### Mobile Usage

The app is responsive and works on mobile devices:
- Touch to select elements
- Drag to move elements
- Pinch to zoom (on canvas)
- Sidebar appears below on small screens
- All features available

### Data & Privacy

- **Local Storage Only** - All data stays on your device
- **No Account Required** - Start creating immediately
- **No Data Collection** - We don't track or store your information
- **Browser Dependent** - Saved designs are per-browser

### Known Limitations

1. **Email Functionality**: Opens the default email client with a mailto link. In production, you would integrate with an email service API (SendGrid, Mailgun, etc.)

2. **Image Storage**: Uploaded images are stored as base64 in localStorage, which has a 5-10MB limit. For production, consider cloud storage.

3. **No User Accounts**: All data is stored locally. Clearing browser data will delete saved designs.

### Homepage Hero Background Images

**For Homepage Hero Section:**
- Place images in `public/image/` folder
- Add image filenames to `src/config/heroBackgrounds.js`
- Images will be randomly selected on page load
- If no images are configured, default gradient background is used

## 🎨 Art Text Templates

| Template | Category | Key Features |
|----------|----------|-------------|
| Gradient Basic | Gradient | Solid color with shadow |
| Neon Glow | Neon | Animated glow effect |
| Metal Shine | Metal | Metallic appearance |
| Fire Effect | Fire | Fire-like animation |
| Rainbow Text | Rainbow | Colorful appearance |
| Vintage Retro | Vintage | Retro styling |
| Crystal Glass | Crystal | Glass-like transparency |
| Comic Style | Comic | Bold comic book style |

##  Component Architecture

### Editor Component Hierarchy

```
CardEditor (Page Component)
├── EditorToolbar
│   ├── Add Text Button
│   ├── Add Art Text Dropdown
│   ├── Add Image Button
│   ├── Add Shapes Dropdown
│   ├── Undo/Redo Buttons
│   └── Save/Export/Email Buttons
│
├── EditorSidebar (Container)
│   ├── BackgroundControls
│   ├── TextPropertiesPanel (conditional)
│   ├── ArtTextPropertiesPanel (conditional)
│   ├── ImagePropertiesPanel (conditional)
│   ├── ShapePropertiesPanel (conditional)
│   └── Delete Button (conditional)
│
└── EditorCanvas
    └── ElementRenderer (for each element)
        ├── Text Element
        ├── Art Text Element
        ├── Image Element
        └── Shape Element
```

### Component Responsibilities

**EditorToolbar**
- Handles element addition (text, art text, image, shapes)
- Provides undo/redo controls
- Exposes save, export, and email actions

**EditorSidebar**
- Container component that conditionally renders property panels
- Manages which panel to show based on selected element type
- Provides delete functionality

**Property Panels** (TextPropertiesPanel, ArtTextPropertiesPanel, etc.)
- Focused on specific element type
- Handle all property editing for that element type
- Communicate changes via callbacks

**EditorCanvas**
- Renders the card preview
- Manages element positioning
- Handles element selection

**ElementRenderer**
- Pure rendering component
- Handles different element types
- Applies styles and effects

## 🔧 Technical Details

### Modular Architecture Benefits

#### **Separation of Concerns**
- **Hooks** handle state and side effects
- **Utils** contain pure business logic
- **Components** focus on rendering
- **Pages** compose hooks and components

#### **Code Reusability**
- Hooks can be reused across different components
- Utility functions are pure and testable
- Components are composable

#### **Maintainability**
- Each module has a single responsibility
- Changes are localized to specific modules
- Easier to understand and debug

### Color Synchronization System

**Location:** `src/utils/colorUtils.js`

When a user changes text color:
1. `webkitTextFillColor` is updated for art text (via `useElementOperations`)
2. `textShadow` colors are replaced via `updateTextShadowColor()`
3. `filter` colors are replaced via `updateFilterColor()`
4. Glow animation is regenerated via `useGlowStyles` hook
5. All effects maintain their structure while updating colors

### Dynamic Animation System

**Location:** `src/utils/styleUtils.js` + `src/hooks/useGlowStyles.js`

- Each art text element with glow animation gets a unique ID
- CSS `@keyframes` are generated at runtime via `generateGlowAnimation()`
- Animations are automatically injected via `useGlowStyles` hook
- Color values are extracted from element properties
- Blur intensity is adjustable via slider

### Export System

**Location:** `src/utils/exportUtils.js`

- Uses `html2canvas` to capture DOM as canvas
- 2x scale for high-quality output
- PDF: 5x7 inch landscape format
- PNG: Full resolution image
- Email: Base64 data URL embedded

### Storage System

**Location:** `src/utils/storageUtils.js`

- Uses browser LocalStorage
- JSON serialization of card data
- Timestamp tracking
- CRUD operations for saved designs

### Element Management System

**Location:** `src/utils/elementUtils.js` + `src/hooks/useElementOperations.js`

- Factory functions for creating elements (`createTextElement`, `createImageElement`, etc.)
- Element operations hook manages CRUD operations
- Text editing logic encapsulated in hook
- Color synchronization handled automatically

##  Future Enhancements

- [ ] User accounts and cloud storage
- [ ] More template designs
- [ ] Advanced editing tools (filters, stickers)
- [ ] Social media sharing
- [ ] Payment integration for physical printing
- [ ] Collaborative editing
- [ ] Real-time preview
- [ ] Mobile app version

##  License

MIT License - Feel free to use this project for learning and development purposes.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
