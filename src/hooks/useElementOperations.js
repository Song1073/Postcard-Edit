import { useState } from 'react'
import { createTextElement, createImageElement, createShapeElement, createArtTextElement } from '../utils/elementUtils'
import { getArtTextTemplate } from '../templates/artTextTemplates'
import { updateTextShadowColor, updateFilterColor } from '../utils/colorUtils'

/**
 * Custom hook for element operations (add, update, delete)
 */
export const useElementOperations = (cardData, setCardData, addToHistory, showNotification) => {
  const [selectedElement, setSelectedElement] = useState(null)
  
  // Text editing state
  const [textContent, setTextContent] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textColor, setTextColor] = useState('#000000')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [selectedArtTextTemplate, setSelectedArtTextTemplate] = useState(null)

  const addText = () => {
    const newElement = createTextElement()
    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    showNotification('Text element added')
  }

  const addImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newElement = createImageElement(event.target.result)
          const updatedCard = {
            ...cardData,
            elements: [...cardData.elements, newElement]
          }
          setCardData(updatedCard)
          addToHistory(updatedCard)
          showNotification('Image added')
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const addShape = (shapeType) => {
    const newElement = createShapeElement(shapeType)
    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    showNotification(`${shapeType} added`)
  }

  const addArtText = (templateId = null) => {
    let templateConfig
    
    if (templateId) {
      const template = getArtTextTemplate(templateId)
      if (template) {
        templateConfig = template.config
      }
    }
    
    if (!templateConfig) {
      templateConfig = {
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
        outlineStyle: 'none',
        outlineWidth: '1px',
        outlineColor: '#000000'
      }
    }

    const newElement = createArtTextElement(templateConfig, templateId)
    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(updatedCard.elements.length - 1)
    showNotification('Art text added')
  }

  const selectElement = (index) => {
    setSelectedElement(index)
    const element = cardData.elements[index]
    if (element.type === 'text' || element.type === 'art-text') {
      setTextContent(element.content)
      setFontSize(element.fontSize)
      setFontFamily(element.customFont || element.fontFamily)

      // For art text, prioritize webkitTextFillColor, use color if transparent
      let displayColor = element.color
      if (element.type === 'art-text') {
        if (element.webkitTextFillColor && element.webkitTextFillColor !== 'transparent') {
          displayColor = element.webkitTextFillColor
        }
      }
      setTextColor(displayColor)
      setIsBold(element.bold || false)
      setIsItalic(element.italic || false)
    }
  }

  const updateElement = (index, updates) => {
    const updatedElements = [...cardData.elements]
    updatedElements[index] = { ...updatedElements[index], ...updates }
    setCardData({ ...cardData, elements: updatedElements })
  }

  const updateElementAndHistory = (index, updates) => {
    updateElement(index, updates)
    const updatedElements = [...cardData.elements]
    updatedElements[index] = { ...updatedElements[index], ...updates }
    const updatedCard = { ...cardData, elements: updatedElements }
    addToHistory(updatedCard)
  }

  const deleteElement = (index) => {
    const updatedElements = cardData.elements.filter((_, i) => i !== index)
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(null)
    showNotification('Element deleted')
  }

  const updateTextContent = () => {
    if (selectedElement !== null) {
      const element = cardData.elements[selectedElement]
      if (element.type === 'text' || element.type === 'art-text') {
        const updates = {
          content: textContent,
          fontSize: parseInt(fontSize),
          fontFamily,
          color: textColor,
          bold: isBold,
          italic: isItalic
        }

        if (element.type === 'art-text') {
          updates.customFont = fontFamily
          
          // For all art text, need to update webkitTextFillColor since they all use backgroundClip
          if (element.backgroundClip === 'text' || element.webkitBackgroundClip === 'text') {
            const isGradient = element.background && element.background.includes('linear-gradient')
            const isPureColor = element.background && !element.background.includes('linear-gradient') && element.background !== 'transparent'
            const isTransparent = element.background === 'transparent'

            if (isGradient) {
              updates.webkitTextFillColor = 'transparent'
            } else if (isPureColor || isTransparent) {
              updates.webkitTextFillColor = textColor
              
              // Update textShadow and filter colors to match new text color
              if (element.textShadow) {
                updates.textShadow = updateTextShadowColor(element.textShadow, textColor)
              }
              if (element.filter) {
                updates.filter = updateFilterColor(element.filter, textColor)
              }
            } else {
              updates.webkitTextFillColor = textColor
              
              // Update textShadow and filter colors to match new text color
              if (element.textShadow) {
                updates.textShadow = updateTextShadowColor(element.textShadow, textColor)
              }
              if (element.filter) {
                updates.filter = updateFilterColor(element.filter, textColor)
              }
            }
          } else {
            updates.color = textColor
            
            // Update textShadow and filter colors to match new text color
            if (element.textShadow) {
              updates.textShadow = updateTextShadowColor(element.textShadow, textColor)
            }
            if (element.filter) {
              updates.filter = updateFilterColor(element.filter, textColor)
            }
          }
        }

        updateElementAndHistory(selectedElement, updates)
        
        // Force glow animation regeneration if color changed
        if (updates.webkitTextFillColor || updates.color || updates.textShadow || updates.filter) {
          setTimeout(() => {
            setCardData(prev => ({ ...prev }))
          }, 0)
        }
      }
    }
  }

  const changeBackground = (color) => {
    const updatedCard = { ...cardData, background: color }
    setCardData(updatedCard)
    addToHistory(updatedCard)
  }

  return {
    selectedElement,
    setSelectedElement,
    textContent,
    setTextContent,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    textColor,
    setTextColor,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    selectedArtTextTemplate,
    setSelectedArtTextTemplate,
    addText,
    addImage,
    addShape,
    addArtText,
    selectElement,
    updateElement,
    updateElementAndHistory,
    deleteElement,
    updateTextContent,
    changeBackground
  }
}

