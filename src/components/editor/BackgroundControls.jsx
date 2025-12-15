import React from 'react'

/**
 * Background Controls Component
 */
export const BackgroundControls = ({ background, onChange }) => {
  const presetColors = ['#ffffff', '#f3f4f6', '#fef3c7', '#dbeafe', '#fce7f3']

  return (
    <div className="sidebar-section">
      <h3>Background</h3>
      <div className="background-options">
        <input
          type="color"
          value={typeof background === 'string' && background.startsWith('#') ? background : '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="color-picker"
        />
        {presetColors.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className="preset-color"
            style={{ background: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

