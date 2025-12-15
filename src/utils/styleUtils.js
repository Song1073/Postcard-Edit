// Style generation utilities for art text effects

/**
 * Generate outline styles for art text elements
 * @param {Object} element - Art text element
 * @returns {Object} - CSS styles object
 */
export const generateOutlineStyles = (element) => {
  // All art text now has no stroke, return original shadow effects
  return {
    WebkitTextStroke: null,
    textShadow: element.textShadow
  }
}

/**
 * Generate dynamic glow animation CSS
 * @param {Object} element - Art text element with glow animation
 * @returns {string|null} - CSS keyframes string or null
 */
export const generateGlowAnimation = (element) => {
  if (!element.animation?.includes('glow')) return null

  const blurIntensity = element.glowBlur || 1
  const baseBlur = 3 * blurIntensity
  const maxBlur = 6 * blurIntensity

  // Use element's actual color, use webkitTextFillColor for art text
  const glowColor = (element.backgroundClip === 'text' || element.webkitBackgroundClip === 'text')
    ? element.webkitTextFillColor || element.color || '#00FFFF'
    : element.color || '#00FFFF'

  return `
    @keyframes glow-custom-${element.id || 'default'} {
      from {
        text-shadow:
          0 0 ${baseBlur}px ${glowColor},
          0 0 ${baseBlur * 1.5}px ${glowColor},
          0 0 ${baseBlur * 2}px ${glowColor};
      }
      to {
        text-shadow:
          0 0 ${maxBlur}px ${glowColor},
          0 0 ${maxBlur * 1.5}px ${glowColor},
          0 0 ${maxBlur * 2}px ${glowColor};
      }
    }
  `
}

/**
 * Generate all glow animations for card elements
 * @param {Array} elements - Array of card elements
 * @returns {string} - Combined CSS styles string
 */
export const generateAllGlowStyles = (elements) => {
  const glowElements = elements?.filter(
    el => el.type === 'art-text' && el.animation?.includes('glow')
  ) || []

  if (glowElements.length > 0) {
    return glowElements.map(element => generateGlowAnimation(element)).join('\n')
  }
  
  return ''
}

