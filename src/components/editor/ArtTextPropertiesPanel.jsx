import React from 'react'
import { Bold, Italic } from 'lucide-react'

/**
 * Art Text Properties Panel Component
 */
export const ArtTextPropertiesPanel = ({
  element,
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
  onUploadBackground,
  onRemoveBackground,
  onUpdateElement,
  onApply
}) => {
  return (
    <div className="sidebar-section">
      <h3>Art Text Properties</h3>
      <div className="text-controls">
        <textarea
          value={textContent}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Enter art text..."
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
          <label>Background Image</label>
          <button className="btn btn-secondary btn-small" onClick={onUploadBackground}>
            Upload Background
          </button>
          {element.backgroundImage && (
            <button
              className="btn btn-danger btn-small"
              onClick={onRemoveBackground}
            >
              Remove Background
            </button>
          )}
        </div>

        <div className="control-group">
          <label>Letter Spacing</label>
          <select
            value={element.letterSpacing || 'normal'}
            onChange={(e) => onUpdateElement({ letterSpacing: e.target.value })}
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
            value={element.animation || 'none'}
            onChange={(e) => onUpdateElement({ animation: e.target.value === 'none' ? null : e.target.value })}
          >
            <option value="none">None</option>
            <option value="glow-custom 2s ease-in-out infinite alternate">Glow</option>
            <option value="bounce 1s infinite">Bounce</option>
            <option value="pulse 2s infinite">Pulse</option>
            <option value="rainbow 3s linear infinite">Rainbow</option>
            <option value="flicker 1.5s infinite">Flicker</option>
          </select>
        </div>

        {element.animation?.includes('glow') && (
          <div className="control-group">
            <label>Glow Blur Intensity</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={element.glowBlur || 1}
              onChange={(e) => onUpdateElement({ glowBlur: parseFloat(e.target.value) })}
              className="opacity-slider"
            />
            <span className="opacity-value">{element.glowBlur || 1}x</span>
          </div>
        )}

        <div className="control-group">
          <label>Transform</label>
          <select
            value={element.transform || 'none'}
            onChange={(e) => onUpdateElement({ transform: e.target.value === 'none' ? null : e.target.value })}
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
            value={element.filter || 'none'}
            onChange={(e) => onUpdateElement({ filter: e.target.value === 'none' ? null : e.target.value })}
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
            value={element.textDecoration || 'none'}
            onChange={(e) => onUpdateElement({ textDecoration: e.target.value === 'none' ? null : e.target.value })}
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
              onClick={onBoldToggle}
            >
              <Bold size={18} />
            </button>
            <button
              className={`style-btn ${isItalic ? 'active' : ''}`}
              onClick={onItalicToggle}
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

