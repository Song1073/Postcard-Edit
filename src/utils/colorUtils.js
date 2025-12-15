// Color utility functions for text effects synchronization

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color string (#RRGGBB or #RGB)
 * @returns {Object|null} - RGB object with r, g, b properties or null
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Update color values in textShadow string
 * @param {string} textShadow - CSS textShadow string
 * @param {string} newColor - New hex color to apply
 * @returns {string} - Updated textShadow string
 */
export const updateTextShadowColor = (textShadow, newColor) => {
  if (!textShadow || textShadow === 'none') return textShadow
  
  const rgb = hexToRgb(newColor)
  if (!rgb) return textShadow
  
  let updated = textShadow
  
  // Replace hex colors (#RRGGBB, #RGB)
  updated = updated.replace(/#[0-9A-Fa-f]{6}/g, newColor)
  updated = updated.replace(/#[0-9A-Fa-f]{3}(?![0-9A-Fa-f])/g, (match) => {
    // Expand shorthand hex
    const expanded = '#' + match[1] + match[1] + match[2] + match[2] + match[3] + match[3]
    return expanded === newColor ? newColor : match
  })
  
  // Replace rgba colors - preserve alpha but update RGB
  updated = updated.replace(/rgba?\([^)]+\)/g, (match) => {
    // Extract alpha value if present
    const alphaMatch = match.match(/,\s*([\d.]+)\)$/)
    const alpha = alphaMatch ? alphaMatch[1] : '1'
    
    // Check if it's rgba or rgb
    if (match.includes('rgba')) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
    } else {
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }
  })
  
  return updated
}

/**
 * Update color values in filter string
 * @param {string} filter - CSS filter string
 * @param {string} newColor - New hex color to apply
 * @returns {string} - Updated filter string
 */
export const updateFilterColor = (filter, newColor) => {
  if (!filter || filter === 'none') return filter
  
  const rgb = hexToRgb(newColor)
  if (!rgb) return filter
  
  let updated = filter
  
  // Replace hex colors in drop-shadow
  updated = updated.replace(/#[0-9A-Fa-f]{6}/g, newColor)
  updated = updated.replace(/#[0-9A-Fa-f]{3}(?![0-9A-Fa-f])/g, (match) => {
    // Expand shorthand hex
    const expanded = '#' + match[1] + match[1] + match[2] + match[2] + match[3] + match[3]
    return expanded === newColor ? newColor : match
  })
  
  // Replace rgba colors in drop-shadow - preserve alpha but update RGB
  updated = updated.replace(/rgba?\([^)]+\)/g, (match) => {
    // Extract alpha value if present
    const alphaMatch = match.match(/,\s*([\d.]+)\)$/)
    const alpha = alphaMatch ? alphaMatch[1] : '1'
    
    // Check if it's rgba or rgb
    if (match.includes('rgba')) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
    } else {
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }
  })
  
  return updated
}

