// Card template definitions with styling and default content
export const cardCategories = [
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'anniversary', name: 'Anniversary', icon: '💕' },
  { id: 'thank-you', name: 'Thank You', icon: '🙏' },
  { id: 'congratulations', name: 'Congratulations', icon: '🎉' },
  { id: 'get-well', name: 'Get Well Soon', icon: '🌸' },
  { id: 'graduation', name: 'Graduation', icon: '🎓' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
  { id: 'blank', name: 'Blank Canvas', icon: '🎨' }
]

export const templates = [
  // Birthday Templates
  {
    id: 'birthday-1',
    category: 'birthday',
    name: 'Colorful Birthday',
    thumbnail: 'birthday-colorful',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    elements: [
      { type: 'text', content: 'Happy Birthday!', fontSize: 48, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 150, bold: true },
      { type: 'text', content: 'Wishing you a day filled with joy and laughter', fontSize: 20, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 250 },
      { type: 'shape', shape: 'circle', color: '#f59e0b', x: 100, y: 100, radius: 30, opacity: 0.7 },
      { type: 'shape', shape: 'circle', color: '#ec4899', x: 500, y: 300, radius: 40, opacity: 0.7 }
    ]
  },
  {
    id: 'birthday-2',
    category: 'birthday',
    name: 'Elegant Birthday',
    thumbnail: 'birthday-elegant',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Happy Birthday', fontSize: 52, fontFamily: 'Georgia', color: '#6366f1', x: 200, y: 180, bold: true },
      { type: 'text', content: 'May all your wishes come true', fontSize: 18, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 260, italic: true },
      { type: 'shape', shape: 'rect', color: '#6366f1', x: 50, y: 100, width: 500, height: 3 }
    ]
  },
  {
    id: 'birthday-3',
    category: 'birthday',
    name: 'Fun Birthday',
    thumbnail: 'birthday-fun',
    background: 'linear-gradient(to bottom, #fbbf24, #f59e0b)',
    elements: [
      { type: 'text', content: '🎈 HAPPY BIRTHDAY 🎈', fontSize: 42, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 150, bold: true },
      { type: 'text', content: "Let's celebrate!", fontSize: 28, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 230 },
      { type: 'text', content: 'Hope your day is as special as you are', fontSize: 16, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 290 }
    ]
  },

  // Christmas Templates
  {
    id: 'christmas-1',
    category: 'christmas',
    name: 'Snowy Christmas',
    thumbnail: 'christmas-snowy',
    background: 'linear-gradient(to bottom, #1e3a8a, #3b82f6)',
    elements: [
      { type: 'text', content: 'Merry Christmas', fontSize: 48, fontFamily: 'Georgia', color: '#ffffff', x: 200, y: 150, bold: true },
      { type: 'text', content: '& Happy New Year', fontSize: 28, fontFamily: 'Georgia', color: '#ffffff', x: 200, y: 220 },
      { type: 'text', content: 'Wishing you peace, joy, and happiness', fontSize: 16, fontFamily: 'Georgia', color: '#e0f2fe', x: 200, y: 280 }
    ]
  },
  {
    id: 'christmas-2',
    category: 'christmas',
    name: 'Classic Christmas',
    thumbnail: 'christmas-classic',
    background: '#dc2626',
    elements: [
      { type: 'text', content: '🎄 Merry Christmas 🎄', fontSize: 44, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 170, bold: true },
      { type: 'text', content: 'May your holidays be filled with love and laughter', fontSize: 18, fontFamily: 'Arial', color: '#fef2f2', x: 200, y: 250 }
    ]
  },

  // Anniversary Templates
  {
    id: 'anniversary-1',
    category: 'anniversary',
    name: 'Romantic Anniversary',
    thumbnail: 'anniversary-romantic',
    background: 'linear-gradient(135deg, #ec4899, #be185d)',
    elements: [
      { type: 'text', content: 'Happy Anniversary', fontSize: 46, fontFamily: 'Georgia', color: '#ffffff', x: 200, y: 160, bold: true },
      { type: 'text', content: 'Celebrating our love', fontSize: 24, fontFamily: 'Georgia', color: '#fce7f3', x: 200, y: 230, italic: true },
      { type: 'text', content: 'Here\'s to many more years together', fontSize: 16, fontFamily: 'Georgia', color: '#ffffff', x: 200, y: 280 }
    ]
  },
  {
    id: 'anniversary-2',
    category: 'anniversary',
    name: 'Elegant Anniversary',
    thumbnail: 'anniversary-elegant',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Happy Anniversary', fontSize: 48, fontFamily: 'Georgia', color: '#be185d', x: 200, y: 170, bold: true },
      { type: 'text', content: '❤️', fontSize: 60, fontFamily: 'Arial', color: '#ec4899', x: 200, y: 240 },
      { type: 'text', content: 'With all my love', fontSize: 20, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 300, italic: true }
    ]
  },

  // Thank You Templates
  {
    id: 'thank-you-1',
    category: 'thank-you',
    name: 'Simple Thanks',
    thumbnail: 'thankyou-simple',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Thank You', fontSize: 56, fontFamily: 'Georgia', color: '#10b981', x: 200, y: 180, bold: true },
      { type: 'text', content: 'Your kindness means the world to me', fontSize: 18, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 260 }
    ]
  },
  {
    id: 'thank-you-2',
    category: 'thank-you',
    name: 'Grateful Thanks',
    thumbnail: 'thankyou-grateful',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    elements: [
      { type: 'text', content: 'Thank You So Much!', fontSize: 44, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 160, bold: true },
      { type: 'text', content: 'I truly appreciate your thoughtfulness', fontSize: 20, fontFamily: 'Arial', color: '#d1fae5', x: 200, y: 240 }
    ]
  },

  // Congratulations Templates
  {
    id: 'congratulations-1',
    category: 'congratulations',
    name: 'Celebration',
    thumbnail: 'congrats-celebration',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    elements: [
      { type: 'text', content: '🎉 Congratulations! 🎉', fontSize: 46, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 150, bold: true },
      { type: 'text', content: 'You did it!', fontSize: 32, fontFamily: 'Arial', color: '#fffbeb', x: 200, y: 220 },
      { type: 'text', content: 'So proud of your achievement', fontSize: 18, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 280 }
    ]
  },
  {
    id: 'congratulations-2',
    category: 'congratulations',
    name: 'Well Done',
    thumbnail: 'congrats-welldone',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Congratulations!', fontSize: 52, fontFamily: 'Georgia', color: '#f59e0b', x: 200, y: 170, bold: true },
      { type: 'text', content: 'Your hard work has paid off', fontSize: 22, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 250 }
    ]
  },

  // Get Well Soon Templates
  {
    id: 'get-well-1',
    category: 'get-well',
    name: 'Feel Better',
    thumbnail: 'getwell-feelbetter',
    background: 'linear-gradient(to bottom, #bfdbfe, #dbeafe)',
    elements: [
      { type: 'text', content: 'Get Well Soon', fontSize: 48, fontFamily: 'Georgia', color: '#2563eb', x: 200, y: 160, bold: true },
      { type: 'text', content: '🌸', fontSize: 50, fontFamily: 'Arial', color: '#ec4899', x: 200, y: 230 },
      { type: 'text', content: 'Sending healing thoughts your way', fontSize: 18, fontFamily: 'Georgia', color: '#1e40af', x: 200, y: 290 }
    ]
  },
  {
    id: 'get-well-2',
    category: 'get-well',
    name: 'Hope & Healing',
    thumbnail: 'getwell-healing',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Wishing You', fontSize: 32, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 140 },
      { type: 'text', content: 'A Speedy Recovery', fontSize: 40, fontFamily: 'Georgia', color: '#10b981', x: 200, y: 190, bold: true },
      { type: 'text', content: 'Get well soon!', fontSize: 22, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 260, italic: true }
    ]
  },

  // Graduation Templates
  {
    id: 'graduation-1',
    category: 'graduation',
    name: 'Graduate Success',
    thumbnail: 'graduation-success',
    background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
    elements: [
      { type: 'text', content: '🎓 Congratulations Graduate! 🎓', fontSize: 40, fontFamily: 'Arial', color: '#ffffff', x: 200, y: 150, bold: true },
      { type: 'text', content: 'The future is yours!', fontSize: 28, fontFamily: 'Arial', color: '#dbeafe', x: 200, y: 230 }
    ]
  },

  // Wedding Templates
  {
    id: 'wedding-1',
    category: 'wedding',
    name: 'Wedding Wishes',
    thumbnail: 'wedding-wishes',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Congratulations', fontSize: 42, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 140, italic: true },
      { type: 'text', content: 'On Your Wedding', fontSize: 48, fontFamily: 'Georgia', color: '#be185d', x: 200, y: 200, bold: true },
      { type: 'text', content: 'Wishing you a lifetime of love and happiness', fontSize: 18, fontFamily: 'Georgia', color: '#6b7280', x: 200, y: 280 }
    ]
  },

  // Blank Template
  {
    id: 'blank-1',
    category: 'blank',
    name: 'Blank Canvas',
    thumbnail: 'blank',
    background: '#ffffff',
    elements: [
      { type: 'text', content: 'Start Creating...', fontSize: 36, fontFamily: 'Arial', color: '#9ca3af', x: 200, y: 200 }
    ]
  }
]

// Get templates by category
export const getTemplatesByCategory = (category) => {
  if (!category || category === 'all') {
    return templates
  }
  return templates.filter(template => template.category === category)
}

// Get template by ID
export const getTemplateById = (id) => {
  return templates.find(template => template.id === id)
}

