import React from 'react'

/**
 * Image Properties Panel Component
 */
export const ImagePropertiesPanel = ({ element, onUpdateElement }) => {
  return (
    <div className="sidebar-section">
      <h3>Image Properties</h3>
      <div className="image-controls">
        <div className="control-group">
          <label>Width</label>
          <input
            type="number"
            value={element.width || 200}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (!isNaN(value) && value >= 40 && value <= 600) {
                onUpdateElement({ width: value })
              }
            }}
            min="40"
            max="600"
          />
        </div>
        <div className="control-group">
          <label>Height</label>
          <input
            type="number"
            value={element.height || 150}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (!isNaN(value) && value >= 40 && value <= 600) {
                onUpdateElement({ height: value })
              }
            }}
            min="40"
            max="600"
          />
        </div>
        <div className="control-group">
          <label>Opacity</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={element.opacity || 1}
            onChange={(e) => onUpdateElement({ opacity: parseFloat(e.target.value) })}
            className="opacity-slider"
          />
          <span className="opacity-value">{Math.round((element.opacity || 1) * 100)}%</span>
        </div>
      </div>
    </div>
  )
}

