import React from 'react'
import { Bold, Italic } from 'lucide-react'

/**
 * Text Properties Panel Component
 */
export const TextPropertiesPanel = ({
  textContent,
  fontSize,
  fontFamily,
  textColor,
  isBold,
  isItalic,
  customFonts,
  onContentChange,
  onFontSizeChange,
  onFontFamilyChange,
  onColorChange,
  onBoldToggle,
  onItalicToggle,
  onUploadFont,
  onApply
}) => {
  return (
    <div className="sidebar-section">
      <h3>Text Properties</h3>
      <div className="text-controls">
        <textarea
          value={textContent}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Enter text..."
          rows="3"
        />

        <div className="control-group">
          <label>Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            min="8"
            max="120"
          />
        </div>

        <div className="control-group">
          <label>Font Family</label>
          <select value={fontFamily} onChange={(e) => onFontFamilyChange(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Impact">Impact</option>
            <option value="Lucida Handwriting">Lucida Handwriting</option>
            {customFonts.map(font => (
              <option key={font.name} value={font.name}>{font.name}</option>
            ))}
          </select>
          <button className="btn btn-secondary btn-small" onClick={onUploadFont}>
            Upload Font
          </button>
        </div>

        <div className="control-group">
          <label>Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="color-picker"
          />
        </div>

        <div className="control-group">
          <label>Style</label>
          <div className="style-buttons">
            <button
              className={`style-btn ${isBold ? 'active' : ''}`}
              onClick={onBoldToggle}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              className={`style-btn ${isItalic ? 'active' : ''}`}
              onClick={onItalicToggle}
              title="Italic"
            >
              <Italic size={18} />
            </button>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onApply}>
          Apply Changes
        </button>
      </div>
    </div>
  )
}

