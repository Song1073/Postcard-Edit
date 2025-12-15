// Element creation utilities

/**
 * Create a new text element
 * @param {Object} options - Element options
 * @returns {Object} - Text element object
 */
export const createTextElement = (options = {}) => {
  return {
    type: 'text',
    content: options.content || 'Double click to edit',
    fontSize: options.fontSize || 24,
    fontFamily: options.fontFamily || 'Arial',
    color: options.color || '#000000',
    x: options.x || 200,
    y: options.y || 200,
    bold: options.bold || false,
    italic: options.italic || false
  }
}

/**
 * Create a new image element
 * @param {string} src - Image source (data URL)
 * @param {Object} options - Element options
 * @returns {Object} - Image element object
 */
export const createImageElement = (src, options = {}) => {
  return {
    type: 'image',
    src,
    x: options.x || 150,
    y: options.y || 150,
    width: options.width || 200,
    height: options.height || 150
  }
}

/**
 * Create a new shape element
 * @param {string} shapeType - Type of shape
 * @param {Object} options - Element options
 * @returns {Object} - Shape element object
 */
export const createShapeElement = (shapeType, options = {}) => {
  const baseElement = {
    type: 'shape',
    shape: shapeType,
    color: options.color || '#3B82F6',
    opacity: options.opacity || 1
  }

  switch (shapeType) {
    case 'rectangle':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        width: options.width || 150,
        height: options.height || 100
      }
    case 'circle':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        radius: options.radius || 50
      }
    case 'triangle':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        width: options.width || 100,
        height: options.height || 100
      }
    case 'arrow':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        width: options.width || 100,
        height: options.height || 50
      }
    case 'star':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        width: options.width || 80,
        height: options.height || 80
      }
    case 'heart':
      return {
        ...baseElement,
        x: options.x || 200,
        y: options.y || 150,
        width: options.width || 60,
        height: options.height || 60
      }
    default:
      return baseElement
  }
}

/**
 * Create a new art text element
 * @param {Object} templateConfig - Art text template configuration
 * @param {string} templateId - Template ID
 * @returns {Object} - Art text element object
 */
export const createArtTextElement = (templateConfig, templateId = null) => {
  const uniqueId = `art-text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  return {
    type: 'art-text',
    id: uniqueId,
    ...templateConfig,
    x: 200,
    y: 200
  }
}

