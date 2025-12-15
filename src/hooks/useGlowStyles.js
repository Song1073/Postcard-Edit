import { useState, useEffect } from 'react'
import { generateAllGlowStyles } from '../utils/styleUtils'

/**
 * Custom hook for managing glow animation styles
 * @param {Object} cardData - Card data object
 * @returns {string} - CSS styles string for glow animations
 */
export const useGlowStyles = (cardData) => {
  const [customGlowStyle, setCustomGlowStyle] = useState('')

  useEffect(() => {
    if (cardData?.elements) {
      const styles = generateAllGlowStyles(cardData.elements)
      setCustomGlowStyle(styles)
    } else {
      setCustomGlowStyle('')
    }
  }, [cardData])

  return customGlowStyle
}

