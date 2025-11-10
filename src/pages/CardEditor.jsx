import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTemplateById } from '../templates/templateData'
import { saveDesign, getDesignById } from '../utils/storageUtils'
import { exportToPDF, exportAsImage } from '../utils/exportUtils'
import { 
  Type, Image as ImageIcon, Save, Download, Mail, 
  Trash2, Bold, Italic, Palette, ZoomIn, ZoomOut, Undo, Redo
} from 'lucide-react'
import EmailModal from '../components/EmailModal'
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

  // Text editing state
  const [textContent, setTextContent] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textColor, setTextColor] = useState('#000000')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  useEffect(() => {
    loadCard()
  }, [templateId])

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

  const selectElement = (index) => {
    setSelectedElement(index)
    const element = cardData.elements[index]
    if (element.type === 'text') {
      setTextContent(element.content)
      setFontSize(element.fontSize)
      setFontFamily(element.fontFamily)
      setTextColor(element.color)
      setIsBold(element.bold || false)
      setIsItalic(element.italic || false)
    }
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

  const updateTextContent = () => {
    if (selectedElement !== null) {
      updateElementAndHistory(selectedElement, {
        content: textContent,
        fontSize: parseInt(fontSize),
        fontFamily,
        color: textColor,
        bold: isBold,
        italic: isItalic
      })
    }
  }

  const changeBackground = (color) => {
    const updatedCard = { ...cardData, background: color }
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
      <div className="container editor-container">
        {/* Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-section">
            <button className="toolbar-btn" onClick={addTextElement} title="Add Text">
              <Type size={20} />
              <span>Add Text</span>
            </button>
            <button className="toolbar-btn" onClick={addImageElement} title="Add Image">
              <ImageIcon size={20} />
              <span>Add Image</span>
            </button>
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
                <input
                  type="color"
                  value={typeof cardData.background === 'string' && cardData.background.startsWith('#') ? cardData.background : '#ffffff'}
                  onChange={(e) => changeBackground(e.target.value)}
                  className="color-picker"
                />
                <button onClick={() => changeBackground('#ffffff')} className="preset-color" style={{ background: '#ffffff' }}></button>
                <button onClick={() => changeBackground('#f3f4f6')} className="preset-color" style={{ background: '#f3f4f6' }}></button>
                <button onClick={() => changeBackground('#fef3c7')} className="preset-color" style={{ background: '#fef3c7' }}></button>
                <button onClick={() => changeBackground('#dbeafe')} className="preset-color" style={{ background: '#dbeafe' }}></button>
                <button onClick={() => changeBackground('#fce7f3')} className="preset-color" style={{ background: '#fce7f3' }}></button>
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
                    </select>
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

            {selectedElement !== null && (
              <div className="sidebar-section">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => deleteElement(selectedElement)}
                  style={{ width: '100%' }}
                >
                  <Trash2 size={18} />
                  Delete Element
                </button>
              </div>
            )}
          </div>

          {/* Canvas */}
          <div className="editor-canvas">
            <div 
              ref={cardRef}
              className="card-preview"
              style={{ background: cardData.background }}
            >
              {cardData.elements.map((element, index) => (
                <div
                  key={index}
                  className={`card-element ${selectedElement === index ? 'selected' : ''}`}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    cursor: 'move'
                  }}
                  onClick={() => selectElement(index)}
                  onDoubleClick={() => {
                    if (element.type === 'text') {
                      selectElement(index)
                    }
                  }}
                >
                  {element.type === 'text' && (
                    <div
                      style={{
                        fontSize: `${element.fontSize}px`,
                        fontFamily: element.fontFamily,
                        color: element.color,
                        fontWeight: element.bold ? 'bold' : 'normal',
                        fontStyle: element.italic ? 'italic' : 'normal',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === 'image' && (
                    <img
                      src={element.src}
                      alt="Card element"
                      style={{
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  {element.type === 'shape' && element.shape === 'circle' && (
                    <div
                      style={{
                        width: `${element.radius * 2}px`,
                        height: `${element.radius * 2}px`,
                        borderRadius: '50%',
                        backgroundColor: element.color,
                        opacity: element.opacity || 1
                      }}
                    />
                  )}
                  {element.type === 'shape' && element.shape === 'rect' && (
                    <div
                      style={{
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        backgroundColor: element.color,
                        opacity: element.opacity || 1
                      }}
                    />
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

