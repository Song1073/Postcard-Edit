import React from 'react'

/**
 * Shape Properties Panel Component
 */
export const ShapePropertiesPanel = ({ element, onUpdateElement }) => {
  const renderShapeSpecificControls = () => {
    const shape = element.shape

    if (shape === 'rectangle' || shape === 'triangle' || shape === 'heart') {
      return (
        <>
          <div className="control-group">
            <label>Width</label>
            <input
              type="number"
              value={element.width || 100}
              onChange={(e) => onUpdateElement({ width: parseInt(e.target.value) })}
              min="20"
              max="400"
            />
          </div>
          <div className="control-group">
            <label>Height</label>
            <input
              type="number"
              value={element.height || 100}
              onChange={(e) => onUpdateElement({ height: parseInt(e.target.value) })}
              min="20"
              max="400"
            />
          </div>
        </>
      )
    }

    if (shape === 'circle' || shape === 'star') {
      return (
        <div className="control-group">
          <label>Radius</label>
          <input
            type="number"
            value={element.radius || 50}
            onChange={(e) => onUpdateElement({ radius: parseInt(e.target.value) })}
            min="10"
            max="200"
          />
        </div>
      )
    }

    if (shape === 'arrow') {
      return (
        <>
          <div className="control-group">
            <label>Width</label>
            <input
              type="number"
              value={element.width || 120}
              onChange={(e) => onUpdateElement({ width: parseInt(e.target.value) })}
              min="40"
              max="300"
            />
          </div>
          <div className="control-group">
            <label>Height</label>
            <input
              type="number"
              value={element.height || 40}
              onChange={(e) => onUpdateElement({ height: parseInt(e.target.value) })}
              min="20"
              max="150"
            />
          </div>
        </>
      )
    }

    if (shape === 'line') {
      return (
        <>
          <div className="control-group">
            <label>Length</label>
            <input
              type="number"
              value={element.width || 100}
              onChange={(e) => onUpdateElement({ width: parseInt(e.target.value) })}
              min="20"
              max="500"
            />
          </div>
          <div className="control-group">
            <label>Thickness</label>
            <input
              type="number"
              value={element.height || 2}
              onChange={(e) => onUpdateElement({ height: parseInt(e.target.value) })}
              min="1"
              max="20"
            />
          </div>
        </>
      )
    }

    return null
  }

  return (
    <div className="sidebar-section">
      <h3>Shape Properties</h3>
      <div className="shape-controls">
        <div className="control-group">
          <label>Color</label>
          <input
            type="color"
            value={element.color || '#3B82F6'}
            onChange={(e) => onUpdateElement({ color: e.target.value })}
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
            value={element.opacity || 1}
            onChange={(e) => onUpdateElement({ opacity: parseFloat(e.target.value) })}
            className="opacity-slider"
          />
          <span className="opacity-value">{Math.round((element.opacity || 1) * 100)}%</span>
        </div>

        {renderShapeSpecificControls()}
      </div>
    </div>
  )
}

