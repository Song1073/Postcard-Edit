import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTemplateById } from '../templates/templateData'
import { getArtTextTemplate, getArtTextTemplatesByCategory } from '../templates/artTextTemplates'
import { saveDesign, getDesignById } from '../utils/storageUtils'
import { exportToPDF, exportAsImage } from '../utils/exportUtils'
import {
  Type, Image as ImageIcon, Save, Download, Mail,
  Trash2, Bold, Italic, Palette, ZoomIn, ZoomOut, Undo, Redo,
  Square, Circle, Triangle, ArrowRight, Star, Heart, Minus, Plus,
  ArrowUp, ArrowDown, Layers, MoveUp, MoveDown
} from 'lucide-react'
import EmailModal from '../components/EmailModal'
import { ImagePropertiesPanel } from '../components/editor/ImagePropertiesPanel'
import './CardEditor.css'

function CardEditor() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const cardRef = useRef(null)

  const [cardData, setCardData] = useState(null)
  const [selectedElement, setSelectedElement] = useState(null)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [notification, setNotification] = useState(null)

  // Drag functionality
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [draggedElement, setDraggedElement] = useState(null)

  // Resize functionality
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState(null) // 'nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'
  const [resizeStartData, setResizeStartData] = useState(null) // { x, y, width, height, mouseX, mouseY }

  // Text editing state
  const [textContent, setTextContent] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textColor, setTextColor] = useState('#000000')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  // Custom font state
  const [customFonts, setCustomFonts] = useState([])

  // Art text state
  const [selectedArtTextTemplate, setSelectedArtTextTemplate] = useState(null)
  const [customGlowStyle, setCustomGlowStyle] = useState('')

  useEffect(() => {
    loadCard()
  }, [templateId])

  // Update custom glow styles
  useEffect(() => {
    const glowElements = cardData?.elements?.filter(el => el.type === 'art-text' && el.animation?.includes('glow')) || []

    if (glowElements.length > 0) {
      const styles = glowElements.map(element => generateGlowAnimation(element)).join('\n')
      setCustomGlowStyle(styles)
    } else {
      setCustomGlowStyle('')
    }
  }, [cardData])

  // Add global mouse event listeners for drag functionality
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isResizing) {
        handleResizeMove(e)
      } else if (isDragging) {
        handleMouseMove(e)
      }
    }
    const handleGlobalMouseUp = () => {
      if (isResizing) {
        handleResizeUp()
      } else if (isDragging) {
        handleMouseUp()
      }
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, isResizing, draggedElement, dragOffset, resizeHandle, resizeStartData])

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
    addToHistory(design)
  }

  const addToHistory = (data) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(data)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCardData(JSON.parse(JSON.stringify(history[historyIndex - 1])))
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCardData(JSON.parse(JSON.stringify(history[historyIndex + 1])))
    }
  }

  const addTextElement = () => {
    const newElement = {
      type: 'text',
      content: 'Double click to edit',
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#000000',
      x: 200,
      y: 200,
      width: 240, // Approximate width based on fontSize
      height: 36, // Approximate height based on fontSize
      bold: false,
      italic: false
    }

    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    showNotification('Text element added')
  }

  const addImageElement = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newElement = {
            type: 'image',
            src: event.target.result,
            x: 150,
            y: 150,
            width: 200,
            height: 150
          }

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

  const addShapeElement = (shapeType) => {
    let newElement

    switch (shapeType) {
      case 'rectangle':
        newElement = {
          type: 'shape',
          shape: 'rectangle',
          x: 200,
          y: 150,
          width: 150,
          height: 100,
          color: '#3B82F6',
          opacity: 1
        }
        break
      case 'circle':
        newElement = {
          type: 'shape',
          shape: 'circle',
          x: 200,
          y: 150,
          radius: 50,
          color: '#EF4444',
          opacity: 1
        }
        break
      case 'triangle':
        newElement = {
          type: 'shape',
          shape: 'triangle',
          x: 200,
          y: 150,
          width: 100,
          height: 100,
          color: '#10B981',
          opacity: 1
        }
        break
      case 'arrow':
        newElement = {
          type: 'shape',
          shape: 'arrow',
          x: 200,
          y: 150,
          width: 120,
          height: 40,
          color: '#F59E0B',
          opacity: 1
        }
        break
      case 'star':
        newElement = {
          type: 'shape',
          shape: 'star',
          x: 200,
          y: 150,
          radius: 40,
          color: '#8B5CF6',
          opacity: 1
        }
        break
      case 'heart':
        newElement = {
          type: 'shape',
          shape: 'heart',
          x: 200,
          y: 150,
          width: 80,
          height: 80,
          color: '#EC4899',
          opacity: 1
        }
        break
      case 'line':
        newElement = {
          type: 'shape',
          shape: 'line',
          x: 200,
          y: 150,
          width: 100,
          height: 2,
          color: '#6B7280',
          opacity: 1
        }
        break
      default:
        return
    }

    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    showNotification(`${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} shape added`)
  }

  const addArtTextElement = (templateId = null) => {
    let artTextConfig = {}

    // If no template is specified, use default style
    if (!templateId) {
      artTextConfig = {
        content: 'Art Text',
        fontSize: 36,
        fontFamily: 'Arial',
        color: '#FFFFFF',
        bold: true,
        italic: false,
        // Art text effects
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        textStroke: '2px #000000',
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
        borderRadius: '8px',
        padding: '8px 16px',
        // Extended properties
        backgroundImage: null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        customFont: null,
        animation: null,
        transform: null,
        filter: null,
        textDecoration: null,
        letterSpacing: 'normal',
        lineHeight: 'normal',
        textAlign: 'center',
        width: 360, // Approximate width based on fontSize
        height: 54 // Approximate height based on fontSize
      }
    } else {
      // Get corresponding configuration based on template ID
      artTextConfig = getArtTextTemplate(templateId)
      // Ensure width and height are set
      if (!artTextConfig.width) {
        artTextConfig.width = (artTextConfig.fontSize || 36) * 10
      }
      if (!artTextConfig.height) {
        artTextConfig.height = (artTextConfig.fontSize || 36) * 1.5
      }
    }

    const newElement = {
      type: 'art-text', // Changed to dedicated art text type
      id: `art-text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      x: 200,
      y: 200,
      ...artTextConfig
    }

    const updatedCard = {
      ...cardData,
      elements: [...cardData.elements, newElement]
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
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

  // Drag functionality
  const handleMouseDown = (e, index) => {
    // Don't start dragging if clicking on a resize handle
    if (e.target.classList.contains('resize-handle')) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    const element = cardData.elements[index]
    const rect = e.currentTarget.getBoundingClientRect()
    const cardRect = cardRef.current.getBoundingClientRect()

    setDraggedElement(index)
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - cardRect.left - element.x,
      y: e.clientY - cardRect.top - element.y
    })

    // Select the element if not already selected
    if (selectedElement !== index) {
      selectElement(index)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || draggedElement === null) return

    const cardRect = cardRef.current.getBoundingClientRect()
    const newX = e.clientX - cardRect.left - dragOffset.x
    const newY = e.clientY - cardRect.top - dragOffset.y

    // Constrain to card boundaries
    const maxX = 600 - 50 // card width minus some margin
    const maxY = 400 - 50 // card height minus some margin

    const constrainedX = Math.max(0, Math.min(newX, maxX))
    const constrainedY = Math.max(0, Math.min(newY, maxY))

    updateElement(draggedElement, {
      x: constrainedX,
      y: constrainedY
    })
  }

  const handleMouseUp = () => {
    if (isDragging && draggedElement !== null) {
      // Save to history after drag ends
      const updatedElements = [...cardData.elements]
      const updatedCard = { ...cardData, elements: updatedElements }
      addToHistory(updatedCard)
    }

    setIsDragging(false)
    setDraggedElement(null)
    setDragOffset({ x: 0, y: 0 })
  }

  // Helper function to get element dimensions
  const getElementDimensions = (element) => {
    if (element.type === 'image' || element.type === 'shape') {
      if (element.shape === 'circle' || element.shape === 'star') {
        const radius = element.radius || 50
        return { width: radius * 2, height: radius * 2, radius }
      } else {
        return {
          width: element.width || 200,
          height: element.height || 150,
          radius: null
        }
      }
    } else if (element.type === 'text' || element.type === 'art-text') {
      // For text elements, use fontSize as a proxy for size, or use width/height if available
      const fontSize = element.fontSize || 24
      return {
        width: element.width || fontSize * 10, // Approximate width based on fontSize
        height: element.height || fontSize * 1.5, // Approximate height based on fontSize
        fontSize
      }
    }
    return { width: 200, height: 150, radius: null }
  }

  // Resize functionality
  const handleResizeStart = (e, index, handle) => {
    e.preventDefault()
    e.stopPropagation()

    const element = cardData.elements[index]
    const cardRect = cardRef.current.getBoundingClientRect()
    const dimensions = getElementDimensions(element)

    setResizeHandle(handle)
    setIsResizing(true)
    setResizeStartData({
      x: element.x,
      y: element.y,
      width: dimensions.width,
      height: dimensions.height,
      radius: dimensions.radius,
      fontSize: dimensions.fontSize,
      elementType: element.type,
      elementShape: element.shape,
      mouseX: e.clientX - cardRect.left,
      mouseY: e.clientY - cardRect.top
    })

    // Select the element if not already selected
    if (selectedElement !== index) {
      selectElement(index)
    }
  }

  const handleResizeMove = (e) => {
    if (!isResizing || resizeHandle === null || resizeStartData === null || selectedElement === null) return

    const cardRect = cardRef.current.getBoundingClientRect()
    const currentMouseX = e.clientX - cardRect.left
    const currentMouseY = e.clientY - cardRect.top

    const deltaX = currentMouseX - resizeStartData.mouseX
    const deltaY = currentMouseY - resizeStartData.mouseY

    let newX = resizeStartData.x
    let newY = resizeStartData.y
    let newWidth = resizeStartData.width
    let newHeight = resizeStartData.height

    // Calculate new dimensions based on handle position
    // Handle positions: 'nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'
    switch (resizeHandle) {
      case 'nw': // Top-left
        newX = resizeStartData.x + deltaX
        newY = resizeStartData.y + deltaY
        newWidth = resizeStartData.width - deltaX
        newHeight = resizeStartData.height - deltaY
        break
      case 'n': // Top
        newY = resizeStartData.y + deltaY
        newHeight = resizeStartData.height - deltaY
        break
      case 'ne': // Top-right
        newY = resizeStartData.y + deltaY
        newWidth = resizeStartData.width + deltaX
        newHeight = resizeStartData.height - deltaY
        break
      case 'e': // Right
        newWidth = resizeStartData.width + deltaX
        break
      case 'se': // Bottom-right
        newWidth = resizeStartData.width + deltaX
        newHeight = resizeStartData.height + deltaY
        break
      case 's': // Bottom
        newHeight = resizeStartData.height + deltaY
        break
      case 'sw': // Bottom-left
        newX = resizeStartData.x + deltaX
        newWidth = resizeStartData.width - deltaX
        newHeight = resizeStartData.height + deltaY
        break
      case 'w': // Left
        newX = resizeStartData.x + deltaX
        newWidth = resizeStartData.width - deltaX
        break
    }

    // Constrain dimensions
    const minSize = 20
    const maxSize = 600
    const maxX = 600
    const maxY = 400

    if (newWidth < minSize) {
      if (resizeHandle.includes('w')) newX -= (minSize - newWidth)
      newWidth = minSize
    }
    if (newWidth > maxSize) {
      if (resizeHandle.includes('w')) newX += (newWidth - maxSize)
      newWidth = maxSize
    }
    if (newHeight < minSize) {
      if (resizeHandle.includes('n')) newY -= (minSize - newHeight)
      newHeight = minSize
    }
    if (newHeight > maxSize) {
      if (resizeHandle.includes('n')) newY += (newHeight - maxSize)
      newHeight = maxSize
    }

    // Constrain position
    newX = Math.max(0, Math.min(newX, maxX - newWidth))
    newY = Math.max(0, Math.min(newY, maxY - newHeight))

    // Prepare updates based on element type
    const element = cardData.elements[selectedElement]
    const updates = { x: newX, y: newY }

    if (element.type === 'image' || (element.type === 'shape' && element.shape !== 'circle' && element.shape !== 'star')) {
      updates.width = newWidth
      updates.height = newHeight
    } else if (element.type === 'shape' && (element.shape === 'circle' || element.shape === 'star')) {
      // For circles and stars, use radius (use average of width and height)
      updates.radius = Math.round((newWidth + newHeight) / 4)
    } else if (element.type === 'text' || element.type === 'art-text') {
      // For text elements, only adjust width/height, keep fontSize unchanged
      updates.width = newWidth
      updates.height = newHeight
    }

    updateElement(selectedElement, updates)
  }

  const handleResizeUp = () => {
    if (isResizing && selectedElement !== null) {
      // Save to history after resize ends
      const updatedElements = [...cardData.elements]
      const updatedCard = { ...cardData, elements: updatedElements }
      addToHistory(updatedCard)
    }

    setIsResizing(false)
    setResizeHandle(null)
    setResizeStartData(null)
  }

  const updateElement = (index, updates) => {
    const updatedElements = [...cardData.elements]
    updatedElements[index] = { ...updatedElements[index], ...updates }
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
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

  // Layer order functions
  const bringToFront = (index) => {
    if (index === cardData.elements.length - 1) return // Already at front
    
    const updatedElements = [...cardData.elements]
    const element = updatedElements.splice(index, 1)[0]
    updatedElements.push(element)
    
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(updatedElements.length - 1) // Update selected index
    showNotification('Element brought to front')
  }

  const sendToBack = (index) => {
    if (index === 0) return // Already at back
    
    const updatedElements = [...cardData.elements]
    const element = updatedElements.splice(index, 1)[0]
    updatedElements.unshift(element)
    
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(0) // Update selected index
    showNotification('Element sent to back')
  }

  const bringForward = (index) => {
    if (index === cardData.elements.length - 1) return // Already at front
    
    const updatedElements = [...cardData.elements]
    const element = updatedElements[index]
    updatedElements[index] = updatedElements[index + 1]
    updatedElements[index + 1] = element
    
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(index + 1) // Update selected index
    showNotification('Element brought forward')
  }

  const sendBackward = (index) => {
    if (index === 0) return // Already at back
    
    const updatedElements = [...cardData.elements]
    const element = updatedElements[index]
    updatedElements[index] = updatedElements[index - 1]
    updatedElements[index - 1] = element
    
    const updatedCard = { ...cardData, elements: updatedElements }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    setSelectedElement(index - 1) // Update selected index
    showNotification('Element sent backward')
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
            // If gradient background, keep transparent; if solid color or transparent background, set to textColor
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
            // For art text that doesn't use backgroundClip, use color directly
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
        // The useEffect will handle this, but we trigger it immediately for better UX
        if (updates.webkitTextFillColor || updates.color || updates.textShadow || updates.filter) {
          // Force re-render by updating a state that triggers the glow useEffect
          setTimeout(() => {
            setCardData(prev => ({ ...prev }))
          }, 0)
        }
      }
    }
  }

  const changeBackground = (color) => {
    const updatedCard = { 
      ...cardData, 
      background: color,
      backgroundImage: null, // Clear background image when setting color
      backgroundType: 'color'
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
  }

  const uploadBackgroundImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const updatedCard = {
            ...cardData,
            backgroundImage: event.target.result,
            backgroundType: 'image',
            backgroundSize: cardData.backgroundSize || 'cover',
            backgroundPosition: cardData.backgroundPosition || 'center',
            backgroundRepeat: cardData.backgroundRepeat || 'no-repeat'
          }
          setCardData(updatedCard)
          addToHistory(updatedCard)
          showNotification('Background image uploaded successfully!')
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const removeBackgroundImage = () => {
    const updatedCard = {
      ...cardData,
      backgroundImage: null,
      backgroundType: 'color',
      background: cardData.background || '#ffffff'
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
    showNotification('Background image removed')
  }

  const updateBackgroundStyle = (styleType, value) => {
    const updatedCard = {
      ...cardData,
      [styleType]: value
    }
    setCardData(updatedCard)
    addToHistory(updatedCard)
  }

  const handleSave = () => {
    try {
      const savedDesign = saveDesign(cardData)
      showNotification('Design saved successfully!')
      setTimeout(() => navigate('/saved'), 1500)
    } catch (error) {
      showNotification('Failed to save design', 'error')
    }
  }

  const handleExportPDF = async () => {
    if (cardRef.current) {
      showNotification('Generating PDF...')
      const result = await exportToPDF(cardRef.current, `${cardData.name || 'card'}.pdf`)
      if (result.success) {
        showNotification('PDF downloaded successfully!')
      } else {
        showNotification('Failed to export PDF', 'error')
      }
    }
  }

  const handleExportImage = async () => {
    if (cardRef.current) {
      showNotification('Generating image...')
      const result = await exportAsImage(cardRef.current, `${cardData.name || 'card'}.png`)
      if (result.success) {
        showNotification('Image downloaded successfully!')
      } else {
        showNotification('Failed to export image', 'error')
      }
    }
  }

  const uploadCustomFont = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.ttf,.otf,.woff,.woff2'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        try {
          const fontFace = new FontFace(`custom-${file.name.split('.')[0]}`, `url(${URL.createObjectURL(file)})`)
          await fontFace.load()
          document.fonts.add(fontFace)

          const newFont = {
            name: `custom-${file.name.split('.')[0]}`,
            originalName: file.name,
            url: URL.createObjectURL(file)
          }

          setCustomFonts(prev => [...prev, newFont])
          showNotification(`Font "${file.name}" uploaded successfully!`)
        } catch (error) {
          showNotification('Font loading failed, please ensure the file format is correct', 'error')
        }
      }
    }
    input.click()
  }

  const uploadArtTextBackground = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (selectedElement !== null && cardData.elements[selectedElement].type === 'art-text') {
            updateElementAndHistory(selectedElement, {
              backgroundImage: event.target.result
            })
            showNotification('Background image applied to art text')
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const generateOutlineStyles = (element) => {
    // All art text now has no stroke, return original shadow effects
    return {
      WebkitTextStroke: null,
      textShadow: element.textShadow
    }
  }

  // Convert hex color to rgb
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Update color values in textShadow string
  const updateTextShadowColor = (textShadow, newColor) => {
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

  // Update color values in filter string
  const updateFilterColor = (filter, newColor) => {
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

  // Generate dynamic glow animation styles
  const generateGlowAnimation = (element) => {
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

  // Render resize handles for selected element
  const renderResizeHandles = (index) => {
    if (selectedElement !== index) return null

    return (
      <>
        {/* Corner handles */}
        <div
          className="resize-handle resize-handle-nw"
          onMouseDown={(e) => handleResizeStart(e, index, 'nw')}
          style={{ cursor: 'nw-resize' }}
        />
        <div
          className="resize-handle resize-handle-ne"
          onMouseDown={(e) => handleResizeStart(e, index, 'ne')}
          style={{ cursor: 'ne-resize' }}
        />
        <div
          className="resize-handle resize-handle-se"
          onMouseDown={(e) => handleResizeStart(e, index, 'se')}
          style={{ cursor: 'se-resize' }}
        />
        <div
          className="resize-handle resize-handle-sw"
          onMouseDown={(e) => handleResizeStart(e, index, 'sw')}
          style={{ cursor: 'sw-resize' }}
        />
        {/* Edge handles */}
        <div
          className="resize-handle resize-handle-n"
          onMouseDown={(e) => handleResizeStart(e, index, 'n')}
          style={{ cursor: 'n-resize' }}
        />
        <div
          className="resize-handle resize-handle-e"
          onMouseDown={(e) => handleResizeStart(e, index, 'e')}
          style={{ cursor: 'e-resize' }}
        />
        <div
          className="resize-handle resize-handle-s"
          onMouseDown={(e) => handleResizeStart(e, index, 's')}
          style={{ cursor: 's-resize' }}
        />
        <div
          className="resize-handle resize-handle-w"
          onMouseDown={(e) => handleResizeStart(e, index, 'w')}
          style={{ cursor: 'w-resize' }}
        />
      </>
    )
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  if (!cardData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="card-editor">
      {/* Custom glow styles */}
      {customGlowStyle && <style dangerouslySetInnerHTML={{ __html: customGlowStyle }} />}
      <div className="container editor-container">
        {/* Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-section">
            <button className="toolbar-btn" onClick={addTextElement} title="Add Text">
              <Type size={20} />
              <span>Add Text</span>
            </button>
            <div className="toolbar-dropdown">
              <button className="toolbar-btn dropdown-toggle" title="Add Art Text">
                <Palette size={20} />
                <span>Art Text</span>
              </button>
              <div className="dropdown-menu art-text-menu">
                <div className="dropdown-section">
                  <h4>Preset Styles</h4>
                  <div className="art-text-templates">
                    {getArtTextTemplatesByCategory('all').map(template => (
                      <button
                        key={template.id}
                        className="dropdown-item art-text-template"
                        onClick={() => addArtTextElement(template.id)}
                        title={template.name}
                      >
                        <span className="template-preview">{template.preview}</span>
                        <span className="template-name">{template.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="toolbar-btn" onClick={addImageElement} title="Add Image">
              <ImageIcon size={20} />
              <span>Add Image</span>
            </button>
          </div>

          <div className="toolbar-section">
            <div className="toolbar-dropdown">
              <button className="toolbar-btn dropdown-toggle" title="Add Shapes">
                <Square size={20} />
                <span>Shapes</span>
              </button>
              <div className="dropdown-menu">
                <button onClick={() => addShapeElement('rectangle')} className="dropdown-item">
                  <Square size={16} />
                  Rectangle
                </button>
                <button onClick={() => addShapeElement('circle')} className="dropdown-item">
                  <Circle size={16} />
                  Circle
                </button>
                <button onClick={() => addShapeElement('triangle')} className="dropdown-item">
                  <Triangle size={16} />
                  Triangle
                </button>
                <button onClick={() => addShapeElement('arrow')} className="dropdown-item">
                  <ArrowRight size={16} />
                  Arrow
                </button>
                <button onClick={() => addShapeElement('star')} className="dropdown-item">
                  <Star size={16} />
                  Star
                </button>
                <button onClick={() => addShapeElement('heart')} className="dropdown-item">
                  <Heart size={16} />
                  Heart
                </button>
                <button onClick={() => addShapeElement('line')} className="dropdown-item">
                  <Minus size={16} />
                  Line
                </button>
              </div>
            </div>
          </div>

          <div className="toolbar-section">
            <button 
              className="toolbar-btn" 
              onClick={undo} 
              disabled={historyIndex <= 0}
              title="Undo"
            >
              <Undo size={20} />
            </button>
            <button 
              className="toolbar-btn" 
              onClick={redo} 
              disabled={historyIndex >= history.length - 1}
              title="Redo"
            >
              <Redo size={20} />
            </button>
          </div>

          <div className="toolbar-section">
            <button className="toolbar-btn" onClick={handleSave} title="Save Design">
              <Save size={20} />
              <span>Save</span>
            </button>
            <button className="toolbar-btn" onClick={handleExportPDF} title="Export PDF">
              <Download size={20} />
              <span>PDF</span>
            </button>
            <button className="toolbar-btn" onClick={() => setShowEmailModal(true)} title="Send Email">
              <Mail size={20} />
              <span>Email</span>
            </button>
          </div>
        </div>

        <div className="editor-main">
          {/* Sidebar */}
          <div className="editor-sidebar">
            <div className="sidebar-section">
              <h3>Background</h3>
              <div className="background-options">
                <div className="control-group">
                  <label>Background Type</label>
                  <select
                    value={cardData.backgroundType || 'color'}
                    onChange={(e) => {
                      if (e.target.value === 'color') {
                        changeBackground(cardData.background || '#ffffff')
                      } else {
                        if (!cardData.backgroundImage) {
                          uploadBackgroundImage()
                        }
                      }
                    }}
                  >
                    <option value="color">Color</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                {(!cardData.backgroundType || cardData.backgroundType === 'color') && (
                  <>
                    <input
                      type="color"
                      value={typeof cardData.background === 'string' && cardData.background.startsWith('#') ? cardData.background : '#ffffff'}
                      onChange={(e) => changeBackground(e.target.value)}
                      className="color-picker"
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      <button onClick={() => changeBackground('#ffffff')} className="preset-color" style={{ background: '#ffffff' }}></button>
                      <button onClick={() => changeBackground('#f3f4f6')} className="preset-color" style={{ background: '#f3f4f6' }}></button>
                      <button onClick={() => changeBackground('#fef3c7')} className="preset-color" style={{ background: '#fef3c7' }}></button>
                      <button onClick={() => changeBackground('#dbeafe')} className="preset-color" style={{ background: '#dbeafe' }}></button>
                      <button onClick={() => changeBackground('#fce7f3')} className="preset-color" style={{ background: '#fce7f3' }}></button>
                    </div>
                  </>
                )}

                {cardData.backgroundType === 'image' && (
                  <>
                    <div className="control-group">
                      <label>Background Image</label>
                      <button className="btn btn-secondary btn-small" onClick={uploadBackgroundImage} style={{ width: '100%', marginBottom: '0.5rem' }}>
                        <ImageIcon size={16} />
                        Upload Image
                      </button>
                      {cardData.backgroundImage && (
                        <button className="btn btn-danger btn-small" onClick={removeBackgroundImage} style={{ width: '100%' }}>
                          Remove Image
                        </button>
                      )}
                    </div>

                    {cardData.backgroundImage && (
                      <>
                        <div className="control-group">
                          <label>Background Size</label>
                          <select
                            value={cardData.backgroundSize || 'cover'}
                            onChange={(e) => updateBackgroundStyle('backgroundSize', e.target.value)}
                          >
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                            <option value="auto">Auto</option>
                            <option value="100% 100%">Stretch</option>
                          </select>
                        </div>

                        <div className="control-group">
                          <label>Background Position</label>
                          <select
                            value={cardData.backgroundPosition || 'center'}
                            onChange={(e) => updateBackgroundStyle('backgroundPosition', e.target.value)}
                          >
                            <option value="center">Center</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="top left">Top Left</option>
                            <option value="top right">Top Right</option>
                            <option value="bottom left">Bottom Left</option>
                            <option value="bottom right">Bottom Right</option>
                          </select>
                        </div>

                        <div className="control-group">
                          <label>Background Repeat</label>
                          <select
                            value={cardData.backgroundRepeat || 'no-repeat'}
                            onChange={(e) => updateBackgroundStyle('backgroundRepeat', e.target.value)}
                          >
                            <option value="no-repeat">No Repeat</option>
                            <option value="repeat">Repeat</option>
                            <option value="repeat-x">Repeat X</option>
                            <option value="repeat-y">Repeat Y</option>
                          </select>
                        </div>

                        <div className="control-group">
                          <label>Background Color (Fallback)</label>
                          <input
                            type="color"
                            value={typeof cardData.background === 'string' && cardData.background.startsWith('#') ? cardData.background : '#ffffff'}
                            onChange={(e) => updateBackgroundStyle('background', e.target.value)}
                            className="color-picker"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {selectedElement !== null && cardData.elements[selectedElement]?.type === 'text' && (
              <div className="sidebar-section">
                <h3>Text Properties</h3>
                <div className="text-controls">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter text..."
                    rows="3"
                  />

                  <div className="control-group">
                    <label>Font Size</label>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      min="8"
                      max="120"
                    />
                  </div>

                  <div className="control-group">
                    <label>Font Family</label>
                    <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                      <option value="Impact">Impact</option>
                      <option value="Lucida Handwriting">Lucida Handwriting</option>
                      {customFonts.map(font => (
                        <option key={font.name} value={font.name}>{font.originalName}</option>
                      ))}
                    </select>
                    <button className="btn btn-secondary btn-small" onClick={uploadCustomFont}>
                      Upload Font
                    </button>
                  </div>

                  <div className="control-group">
                    <label>Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="color-picker"
                    />
                  </div>

                  <div className="control-group">
                    <label>Style</label>
                    <div className="style-buttons">
                      <button
                        className={`style-btn ${isBold ? 'active' : ''}`}
                        onClick={() => setIsBold(!isBold)}
                      >
                        <Bold size={18} />
                      </button>
                      <button
                        className={`style-btn ${isItalic ? 'active' : ''}`}
                        onClick={() => setIsItalic(!isItalic)}
                      >
                        <Italic size={18} />
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={updateTextContent}>
                    Apply Changes
                  </button>
                </div>
              </div>
            )}

            {selectedElement !== null && cardData.elements[selectedElement]?.type === 'art-text' && (
              <div className="sidebar-section">
                <h3>Art Text Properties</h3>
                <div className="text-controls">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter art text..."
                    rows="3"
                  />

                  <div className="control-group">
                    <label>Font Size</label>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      min="8"
                      max="120"
                    />
                  </div>

                  <div className="control-group">
                    <label>Font Family</label>
                    <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                      <option value="Impact">Impact</option>
                      <option value="Lucida Handwriting">Lucida Handwriting</option>
                      {customFonts.map(font => (
                        <option key={font.name} value={font.name}>{font.originalName}</option>
                      ))}
                    </select>
                    <button className="btn btn-secondary btn-small" onClick={uploadCustomFont}>
                      Upload Font
                    </button>
                  </div>

                  <div className="control-group">
                    <label>Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="color-picker"
                    />
                  </div>

                  <div className="control-group">
                    <label>Background Image</label>
                    <button className="btn btn-secondary btn-small" onClick={uploadArtTextBackground}>
                      Upload Background
                    </button>
                    {cardData.elements[selectedElement].backgroundImage && (
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => updateElementAndHistory(selectedElement, { backgroundImage: null })}
                      >
                        Remove Background
                      </button>
                    )}
                  </div>


                  <div className="control-group">
                    <label>Letter Spacing</label>
                    <select
                      value={cardData.elements[selectedElement].letterSpacing || 'normal'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { letterSpacing: e.target.value })}
                    >
                      <option value="normal">Normal</option>
                      <option value="1px">1px</option>
                      <option value="2px">2px</option>
                      <option value="3px">3px</option>
                      <option value="-1px">-1px</option>
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Animation</label>
                    <select
                      value={cardData.elements[selectedElement].animation || 'none'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { animation: e.target.value === 'none' ? null : e.target.value })}
                    >
                      <option value="none">None</option>
                      <option value="glow 2s ease-in-out infinite alternate">Glow</option>
                      <option value="bounce 1s infinite">Bounce</option>
                      <option value="pulse 2s infinite">Pulse</option>
                      <option value="rainbow 3s linear infinite">Rainbow</option>
                      <option value="flicker 1.5s infinite">Flicker</option>
                    </select>
                  </div>

                  {cardData.elements[selectedElement].animation?.includes('glow') && (
                    <div className="control-group">
                      <label>Glow Blur Intensity</label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={cardData.elements[selectedElement].glowBlur || 1}
                        onChange={(e) => updateElementAndHistory(selectedElement, { glowBlur: parseFloat(e.target.value) })}
                        className="opacity-slider"
                      />
                      <span className="opacity-value">{cardData.elements[selectedElement].glowBlur || 1}x</span>
                    </div>
                  )}

                  <div className="control-group">
                    <label>Transform</label>
                    <select
                      value={cardData.elements[selectedElement].transform || 'none'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { transform: e.target.value === 'none' ? null : e.target.value })}
                    >
                      <option value="none">None</option>
                      <option value="rotate(-2deg)">Rotate -2°</option>
                      <option value="rotate(2deg)">Rotate 2°</option>
                      <option value="scale(1.1)">Scale 1.1x</option>
                      <option value="skew(-5deg)">Skew -5°</option>
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Filter Effects</label>
                    <select
                      value={cardData.elements[selectedElement].filter || 'none'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { filter: e.target.value === 'none' ? null : e.target.value })}
                    >
                      <option value="none">None</option>
                      <option value="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))">Drop Shadow</option>
                      <option value="blur(1px)">Blur</option>
                      <option value="brightness(1.2)">Brightness</option>
                      <option value="sepia(20%)">Sepia</option>
                      <option value="hue-rotate(90deg)">Hue Rotate</option>
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Text Decoration</label>
                    <select
                      value={cardData.elements[selectedElement].textDecoration || 'none'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { textDecoration: e.target.value === 'none' ? null : e.target.value })}
                    >
                      <option value="none">None</option>
                      <option value="underline">Underline</option>
                      <option value="overline">Overline</option>
                      <option value="line-through">Line Through</option>
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Style</label>
                    <div className="style-buttons">
                      <button
                        className={`style-btn ${isBold ? 'active' : ''}`}
                        onClick={() => setIsBold(!isBold)}
                      >
                        <Bold size={18} />
                      </button>
                      <button
                        className={`style-btn ${isItalic ? 'active' : ''}`}
                        onClick={() => setIsItalic(!isItalic)}
                      >
                        <Italic size={18} />
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={updateTextContent}>
                    Apply Changes
                  </button>
                </div>
              </div>
            )}

            {selectedElement !== null && cardData.elements[selectedElement]?.type === 'shape' && (
              <div className="sidebar-section">
                <h3>Shape Properties</h3>
                <div className="shape-controls">
                  <div className="control-group">
                    <label>Color</label>
                    <input
                      type="color"
                      value={cardData.elements[selectedElement].color || '#3B82F6'}
                      onChange={(e) => updateElementAndHistory(selectedElement, { color: e.target.value })}
                      className="color-picker"
                    />
                  </div>

                  <div className="control-group">
                    <label>Opacity</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={cardData.elements[selectedElement].opacity || 1}
                      onChange={(e) => updateElementAndHistory(selectedElement, { opacity: parseFloat(e.target.value) })}
                      className="opacity-slider"
                    />
                    <span className="opacity-value">{Math.round((cardData.elements[selectedElement].opacity || 1) * 100)}%</span>
                  </div>

                  {(cardData.elements[selectedElement].shape === 'rectangle' ||
                    cardData.elements[selectedElement].shape === 'triangle' ||
                    cardData.elements[selectedElement].shape === 'heart') && (
                    <>
                      <div className="control-group">
                        <label>Width</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].width || 100}
                          onChange={(e) => updateElementAndHistory(selectedElement, { width: parseInt(e.target.value) })}
                          min="20"
                          max="400"
                        />
                      </div>
                      <div className="control-group">
                        <label>Height</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].height || 100}
                          onChange={(e) => updateElementAndHistory(selectedElement, { height: parseInt(e.target.value) })}
                          min="20"
                          max="400"
                        />
                      </div>
                    </>
                  )}

                  {(cardData.elements[selectedElement].shape === 'circle' ||
                    cardData.elements[selectedElement].shape === 'star') && (
                    <div className="control-group">
                      <label>Radius</label>
                      <input
                        type="number"
                        value={cardData.elements[selectedElement].radius || 50}
                        onChange={(e) => updateElementAndHistory(selectedElement, { radius: parseInt(e.target.value) })}
                        min="10"
                        max="200"
                      />
                    </div>
                  )}

                  {cardData.elements[selectedElement].shape === 'arrow' && (
                    <>
                      <div className="control-group">
                        <label>Width</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].width || 120}
                          onChange={(e) => updateElementAndHistory(selectedElement, { width: parseInt(e.target.value) })}
                          min="40"
                          max="300"
                        />
                      </div>
                      <div className="control-group">
                        <label>Height</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].height || 40}
                          onChange={(e) => updateElementAndHistory(selectedElement, { height: parseInt(e.target.value) })}
                          min="20"
                          max="150"
                        />
                      </div>
                    </>
                  )}

                  {cardData.elements[selectedElement].shape === 'line' && (
                    <>
                      <div className="control-group">
                        <label>Length</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].width || 100}
                          onChange={(e) => updateElementAndHistory(selectedElement, { width: parseInt(e.target.value) })}
                          min="20"
                          max="500"
                        />
                      </div>
                      <div className="control-group">
                        <label>Thickness</label>
                        <input
                          type="number"
                          value={cardData.elements[selectedElement].height || 2}
                          onChange={(e) => updateElementAndHistory(selectedElement, { height: parseInt(e.target.value) })}
                          min="1"
                          max="20"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {selectedElement !== null && cardData.elements[selectedElement]?.type === 'image' && (
              <ImagePropertiesPanel
                element={cardData.elements[selectedElement]}
                onUpdateElement={(updates) => updateElementAndHistory(selectedElement, updates)}
              />
            )}

            {selectedElement !== null && (
              <>
                <div className="sidebar-section">
                  <h3>Layer Order</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => bringToFront(selectedElement)}
                      disabled={selectedElement === cardData.elements.length - 1}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      title="Bring to Front"
                    >
                      <Layers size={16} />
                      Bring to Front
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => bringForward(selectedElement)}
                      disabled={selectedElement === cardData.elements.length - 1}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      title="Bring Forward"
                    >
                      <ArrowUp size={16} />
                      Bring Forward
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => sendBackward(selectedElement)}
                      disabled={selectedElement === 0}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      title="Send Backward"
                    >
                      <ArrowDown size={16} />
                      Send Backward
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => sendToBack(selectedElement)}
                      disabled={selectedElement === 0}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      title="Send to Back"
                    >
                      <Layers size={16} />
                      Send to Back
                    </button>
                  </div>
                </div>
                <div className="sidebar-section">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => deleteElement(selectedElement)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Trash2 size={18} />
                    Delete Element
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Canvas */}
          <div className="editor-canvas">
            <div 
              ref={cardRef}
              className="card-preview"
              style={{
                background: cardData.backgroundImage 
                  ? `url(${cardData.backgroundImage}) ${cardData.background || '#ffffff'}`
                  : cardData.background || '#ffffff',
                backgroundSize: cardData.backgroundImage ? (cardData.backgroundSize || 'cover') : 'auto',
                backgroundPosition: cardData.backgroundImage ? (cardData.backgroundPosition || 'center') : 'auto',
                backgroundRepeat: cardData.backgroundImage ? (cardData.backgroundRepeat || 'no-repeat') : 'auto'
              }}
            >
              {cardData.elements.map((element, index) => (
                <div
                  key={index}
                  className={`card-element ${selectedElement === index ? 'selected' : ''} ${isDragging && draggedElement === index ? 'dragging' : ''}`}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    cursor: isDragging ? 'grabbing' : 'move',
                    zIndex: isDragging && draggedElement === index ? 1000 : 'auto'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectElement(index)
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    if (element.type === 'text' || element.type === 'art-text') {
                      selectElement(index)
                    }
                  }}
                >
                  {element.type === 'text' && (
                    <>
                      <div
                        style={{
                          fontSize: `${element.fontSize}px`,
                          fontFamily: element.fontFamily,
                          color: element.color,
                          fontWeight: element.bold ? 'bold' : 'normal',
                          fontStyle: element.italic ? 'italic' : 'normal',
                          whiteSpace: 'pre-wrap',
                          display: 'inline-block',
                          minWidth: element.width ? `${element.width}px` : 'fit-content',
                          width: element.width ? `${element.width}px` : 'auto',
                          height: element.height ? `${element.height}px` : 'auto'
                        }}
                      >
                        {element.content}
                      </div>
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'art-text' && (
                    <>
                      <div
                        style={{
                          fontSize: `${element.fontSize}px`,
                          fontFamily: element.customFont || element.fontFamily,
                          color: (element.backgroundClip === 'text' || element.webkitBackgroundClip === 'text')
                            ? element.webkitTextFillColor || element.color
                            : element.color,
                          fontWeight: element.bold ? 'bold' : 'normal',
                          fontStyle: element.italic ? 'italic' : 'normal',
                          whiteSpace: 'pre-wrap',
                          // Art text effects - using new stroke system
                          ...generateOutlineStyles(element),
                          background: element.backgroundImage
                            ? `url(${element.backgroundImage}), ${element.background}`
                            : element.background,
                          backgroundSize: element.backgroundSize,
                          backgroundPosition: element.backgroundPosition,
                          backgroundRepeat: element.backgroundRepeat,
                          backgroundClip: element.backgroundClip,
                          WebkitBackgroundClip: element.webkitBackgroundClip,
                          WebkitTextFillColor: element.webkitTextFillColor,
                          borderRadius: element.borderRadius,
                          padding: element.padding,
                          display: 'inline-block',
                          minWidth: element.width ? `${element.width}px` : 'fit-content',
                          width: element.width ? `${element.width}px` : 'auto',
                          height: element.height ? `${element.height}px` : 'auto',
                          // New style properties
                          animation: element.animation?.includes('glow') ? `glow-custom-${element.id || 'default'} 2s ease-in-out infinite alternate` : element.animation,
                          transform: element.transform,
                          filter: element.filter,
                          textDecoration: element.textDecoration,
                          letterSpacing: element.letterSpacing,
                          lineHeight: element.lineHeight,
                          textAlign: element.textAlign
                        }}
                      >
                        {element.content}
                      </div>
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'image' && (
                    <>
                      <img
                        src={element.src}
                        alt="Card element"
                        style={{
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          objectFit: 'fill',
                          opacity: element.opacity || 1
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'rectangle' && (
                    <>
                      <div
                        style={{
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          backgroundColor: element.color,
                          opacity: element.opacity || 1,
                          borderRadius: '4px'
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'circle' && (
                    <>
                      <div
                        style={{
                          width: `${element.radius * 2}px`,
                          height: `${element.radius * 2}px`,
                          borderRadius: '50%',
                          backgroundColor: element.color,
                          opacity: element.opacity || 1
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'triangle' && (
                    <>
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: `${element.width/2}px solid transparent`,
                          borderRight: `${element.width/2}px solid transparent`,
                          borderBottom: `${element.height}px solid ${element.color}`,
                          opacity: element.opacity || 1
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'arrow' && (
                    <>
                      <div
                        style={{
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          backgroundColor: element.color,
                          opacity: element.opacity || 1,
                          clipPath: 'polygon(0% 40%, 70% 40%, 70% 20%, 100% 50%, 70% 80%, 70% 60%, 0% 60%)'
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'star' && (
                    <>
                      <div
                        style={{
                          width: `${element.radius * 2}px`,
                          height: `${element.radius * 2}px`,
                          backgroundColor: element.color,
                          opacity: element.opacity || 1,
                          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'heart' && (
                    <>
                      <div
                        style={{
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          backgroundColor: element.color,
                          opacity: element.opacity || 1,
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            width: `${element.width/2}px`,
                            height: `${element.height * 0.75}px`,
                            borderRadius: `${element.width/2}px ${element.width/2}px 0 0`,
                            backgroundColor: 'inherit',
                            position: 'absolute',
                            left: 0,
                            top: 0
                          }}
                        />
                        <div
                          style={{
                            width: `${element.width/2}px`,
                            height: `${element.height * 0.75}px`,
                            borderRadius: `${element.width/2}px ${element.width/2}px 0 0`,
                            backgroundColor: 'inherit',
                            position: 'absolute',
                            right: 0,
                            top: 0
                          }}
                        />
                        <div
                          style={{
                            width: `${element.width}px`,
                            height: `${element.height * 0.5}px`,
                            borderRadius: '50%',
                            backgroundColor: 'inherit',
                            position: 'absolute',
                            bottom: 0,
                            left: 0
                          }}
                        />
                      </div>
                      {renderResizeHandles(index)}
                    </>
                  )}
                  {element.type === 'shape' && element.shape === 'line' && (
                    <>
                      <div
                        style={{
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          backgroundColor: element.color,
                          opacity: element.opacity || 1
                        }}
                      />
                      {renderResizeHandles(index)}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          cardRef={cardRef}
          cardData={cardData}
          onClose={() => setShowEmailModal(false)}
          onSuccess={() => {
            setShowEmailModal(false)
            showNotification('Email sent successfully!')
          }}
        />
      )}
    </div>
  )
}

export default CardEditor

