import React from 'react'
import { ElementRenderer } from './ElementRenderer'

/**
 * Editor Canvas Component
 * Renders the card preview with all elements
 */
export const EditorCanvas = ({
  cardRef,
  cardData,
  selectedElement,
  isDragging,
  draggedElement,
  onElementMouseDown,
  onElementClick,
  onElementDoubleClick,
  onCanvasClick
}) => {
  return (
    <div className="editor-canvas">
      <div 
        ref={cardRef}
        className="card-preview"
        style={{ background: cardData.background }}
        onClick={onCanvasClick}
      >
        {cardData.elements.map((element, index) => (
          <ElementRenderer
            key={index}
            element={element}
            index={index}
            isSelected={selectedElement === index}
            isDragging={isDragging && draggedElement === index}
            onMouseDown={onElementMouseDown}
            onClick={onElementClick}
            onDoubleClick={onElementDoubleClick}
          />
        ))}
      </div>
    </div>
  )
}

