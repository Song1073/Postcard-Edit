import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getTemplateById } from '../templates/templateData'
import { getDesignById } from '../utils/storageUtils'

/**
 * Custom hook for managing card data
 * @returns {Object} - Card data state and loading function
 */
export const useCardData = () => {
  const { templateId } = useParams()
  const [cardData, setCardData] = useState(null)

  const loadCard = () => {
    let design = null
    
    // Check if loading a saved design or a template
    if (templateId && templateId.startsWith('saved-')) {
      const savedId = templateId.replace('saved-', '')
      design = getDesignById(savedId)
    } else if (templateId) {
      const template = getTemplateById(templateId)
      if (template) {
        design = {
          ...template,
          elements: JSON.parse(JSON.stringify(template.elements))
        }
      }
    }

    if (!design) {
      // Create blank card
      design = {
        id: 'blank-new',
        name: 'Blank Card',
        background: '#ffffff',
        elements: []
      }
    }

    setCardData(design)
    return design
  }

  useEffect(() => {
    loadCard()
  }, [templateId])

  return {
    cardData,
    setCardData,
    loadCard
  }
}

