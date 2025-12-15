  // Art text style templates and configurations
export const artTextTemplates = [
  {
    id: 'gradient-basic',
    name: 'Gradient Basic',
    category: 'gradient',
    preview: '🎨',
    config: {
      content: 'Art Text',
      fontSize: 36,
      fontFamily: 'Arial',
      color: '#FF6B6B',
      bold: true,
      italic: false,
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      textStroke: null,
      background: '#FF6B6B',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#FF6B6B',
      borderRadius: '8px',
      padding: '8px 16px',
      backgroundImage: null,
      customFont: null,
      animation: null,
      transform: null,
      filter: null,
      letterSpacing: 'normal',
      lineHeight: 'normal',
      textAlign: 'center',
      // Stroke system
      outlineStyle: 'none',
      outlineWidth: '1px',
      outlineColor: '#000000'
    }
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'neon',
    preview: '✨',
    config: {
      content: 'Neon Art Text',
      fontSize: 40,
      fontFamily: 'Arial',
      color: '#00FFFF',
      bold: true,
      italic: false,
      textShadow: '0 0 2px #00FFFF, 0 0 4px #00FFFF',
      textStroke: null,
      background: 'transparent',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#00FFFF',
      borderRadius: '4px',
      padding: '6px 12px',
      backgroundImage: null,
      customFont: null,
      animation: 'glow-custom 2s ease-in-out infinite alternate',
      transform: null,
      filter: 'drop-shadow(0 0 6px #00FFFF)',
      letterSpacing: '2px',
      lineHeight: 'normal',
      textAlign: 'center',
      // Stroke system - neon effect uses glow stroke
      outlineStyle: 'none',
      outlineWidth: '0.5px',
      outlineColor: '#00FFFF',
      glowBlur: 0.8
    }
  },
  {
    id: 'metal-shine',
    name: 'Metal Shine',
    category: 'metal',
    preview: '🔩',
    config: {
      content: 'Metal Art Text',
      fontSize: 38,
      fontFamily: 'Arial',
      color: '#CCCCCC',
      bold: true,
      italic: false,
      textShadow: '1px 1px 1px rgba(0,0,0,0.6)',
      textStroke: null,
      background: '#CCCCCC',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#CCCCCC',
      borderRadius: '6px',
      padding: '10px 20px',
      backgroundImage: null,
      customFont: null,
      animation: null,
      transform: null,
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
      letterSpacing: '1px',
      lineHeight: 'normal',
      textAlign: 'center'
    }
  },
  {
    id: 'fire-effect',
    name: 'Fire Effect',
    category: 'fire',
    preview: '🔥',
    config: {
      content: 'Fire Art Text',
      fontSize: 42,
      fontFamily: 'Arial',
      color: '#FF4500',
      bold: true,
      italic: false,
      textShadow: '0 0 2px #FF4500, 0 0 4px #FF4500',
      textStroke: null,
      background: '#FF4500',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#FF4500',
      borderRadius: '8px',
      padding: '8px 16px',
      backgroundImage: null,
      customFont: null,
      animation: 'flicker 1.5s infinite',
      transform: null,
      filter: 'drop-shadow(0 0 8px #FF4500)',
      letterSpacing: 'normal',
      lineHeight: 'normal',
      textAlign: 'center'
    }
  },
  {
    id: 'rainbow-text',
    name: 'Rainbow Text',
    category: 'rainbow',
    preview: '🌈',
    config: {
      content: 'Rainbow Art Text',
      fontSize: 36,
      fontFamily: 'Arial',
      color: '#FF0000',
      bold: true,
      italic: false,
      textShadow: 'none',
      textStroke: null,
      background: '#FF0000',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#FF0000',
      borderRadius: '12px',
      padding: '12px 24px',
      backgroundImage: null,
      customFont: null,
      animation: 'rainbow 3s linear infinite',
      transform: null,
      filter: null,
      letterSpacing: '2px',
      lineHeight: 'normal',
      textAlign: 'center'
    }
  },
  {
    id: 'vintage-retro',
    name: 'Vintage Retro',
    category: 'vintage',
    preview: '📻',
    config: {
      content: 'Vintage Art Text',
      fontSize: 34,
      fontFamily: 'Georgia',
      color: '#DEB887',
      bold: true,
      italic: false,
      textShadow: '1px 1px 2px rgba(139,69,19,0.4)',
      textStroke: null,
      background: '#DEB887',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#DEB887',
      borderRadius: '15px',
      padding: '10px 20px',
      backgroundImage: null,
      customFont: null,
      animation: null,
      transform: 'rotate(-2deg)',
      filter: 'sepia(20%)',
      letterSpacing: '1px',
      lineHeight: 'normal',
      textAlign: 'center'
    }
  },
  {
    id: 'crystal-glass',
    name: 'Crystal Glass',
    category: 'crystal',
    preview: '💎',
    config: {
      content: 'Crystal Art Text',
      fontSize: 40,
      fontFamily: 'Arial',
      color: '#FFFFFF',
      bold: true,
      italic: false,
      textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.6)',
      textStroke: null,
      background: '#FFFFFF',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#FFFFFF',
      borderRadius: '20px',
      padding: '15px 30px',
      backgroundImage: null,
      customFont: null,
      animation: null,
      transform: null,
      filter: 'blur(0.2px) brightness(1.1)',
      letterSpacing: '3px',
      lineHeight: 'normal',
      textAlign: 'center'
    }
  },
  {
    id: 'comic-style',
    name: 'Comic Style',
    category: 'comic',
    preview: '💥',
    config: {
      content: 'Comic Art Text',
      fontSize: 44,
      fontFamily: 'Impact',
      color: '#FFFFFF',
      bold: true,
      italic: false,
      textShadow: null,
      textStroke: null,
      background: '#FF0000',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: '#FFFFFF',
      borderRadius: '0px',
      padding: '8px 16px',
      backgroundImage: null,
      customFont: null,
      animation: 'bounce 1s infinite',
      transform: null,
      filter: null,
      letterSpacing: 'normal',
      lineHeight: 'normal',
      textAlign: 'center',
      // Stroke system - comic style uses special stroke
      outlineStyle: 'none',
      outlineWidth: '2px',
      outlineColor: '#000000'
    }
  }
]

// Get art text template by ID
export const getArtTextTemplate = (id) => {
  const template = artTextTemplates.find(template => template.id === id)
  return template ? { ...template.config } : null
}

// Get templates by category
export const getArtTextTemplatesByCategory = (category) => {
  if (!category || category === 'all') {
    return artTextTemplates
  }
  return artTextTemplates.filter(template => template.category === category)
}

// Get all template categories
export const getArtTextCategories = () => {
  const categories = [...new Set(artTextTemplates.map(template => template.category))]
  return categories.map(category => ({
    id: category,
    name: getCategoryDisplayName(category),
    templates: artTextTemplates.filter(template => template.category === category)
  }))
}

// Helper function to get display names for categories
const getCategoryDisplayName = (category) => {
  const names = {
    'gradient': 'Gradient',
    'neon': 'Neon',
    'metal': 'Metal',
    'fire': 'Fire',
    'rainbow': 'Rainbow',
    'vintage': 'Vintage',
    'crystal': 'Crystal',
    'comic': 'Comic'
  }
  return names[category] || category
}
