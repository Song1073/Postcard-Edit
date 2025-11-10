# Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

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

### 2. Start Development Server

After installation completes, start the development server:

```bash
npm run dev
```

The application will open automatically in your default browser at `http://localhost:3000`

### 3. Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### 4. Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### Module Not Found Errors

If you see module errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Browser Cache

If you see stale content, clear your browser cache or use:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

## Features Overview

Once running, you can:

1. **Browse Templates** - Choose from 20+ pre-designed templates
2. **Customize Cards** - Add text, images, change colors and fonts
3. **Save Designs** - Store your work in browser localStorage
4. **Export PDF** - Download print-ready cards
5. **Send eCards** - Share via email

## Project Structure

```
greeting-card-maker/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── EmailModal.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── TemplateGallery.jsx
│   │   ├── CardEditor.jsx
│   │   └── SavedDesigns.jsx
│   ├── templates/       # Card templates data
│   │   └── templateData.js
│   ├── utils/           # Utility functions
│   │   ├── storageUtils.js
│   │   └── exportUtils.js
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html
├── package.json
└── vite.config.js
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Limitations

1. **Email Functionality**: Opens the default email client with a mailto link. In production, you would integrate with an email service API (SendGrid, Mailgun, etc.)

2. **Image Storage**: Uploaded images are stored as base64 in localStorage, which has a 5-10MB limit. For production, consider cloud storage.

3. **No User Accounts**: All data is stored locally. Clearing browser data will delete saved designs.

## Next Steps for Production

To make this production-ready, consider adding:
- Backend API with database
- User authentication
- Cloud image storage
- Server-side email sending
- More template designs
- Advanced editing features (layers, filters, stickers)
- Payment integration for physical printing
- Social media sharing

## Support

For issues or questions, refer to the README.md file or check the documentation for the individual libraries used.

Enjoy creating beautiful greeting cards! 🎉

