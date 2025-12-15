import React from 'react'
import { generateOutlineStyles } from '../../utils/styleUtils'

/**
 * Component for rendering card elements
 */
export const ElementRenderer = ({ 
  element, 
  index, 
  isSelected, 
  isDragging, 
  onMouseDown, 
  onClick, 
  onDoubleClick 
}) => {
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <div
            style={{
              fontSize: `${element.fontSize}px`,
              fontFamily: element.fontFamily,
              color: element.color,
              fontWeight: element.bold ? 'bold' : 'normal',
              fontStyle: element.italic ? 'italic' : 'normal',
              whiteSpace: 'pre-wrap',
              display: 'inline-block',
              minWidth: 'fit-content'
            }}
          >
            {element.content}
          </div>
        )

      case 'art-text':
        return (
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
              minWidth: 'fit-content',
              animation: element.animation?.includes('glow') 
                ? `glow-custom-${element.id || 'default'} 2s ease-in-out infinite alternate` 
                : element.animation,
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
        )

      case 'image':
        return (
          <img
            src={element.src}
            alt="Card element"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              objectFit: 'fill',
              display: 'block'
            }}
          />
        )

      case 'shape':
        return renderShape(element)

      default:
        return null
    }
  }

  const renderShape = (shapeElement) => {
    const commonStyle = {
      backgroundColor: shapeElement.color,
      opacity: shapeElement.opacity
    }

    switch (shapeElement.shape) {
      case 'rectangle':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.width}px`,
              height: `${shapeElement.height}px`
            }}
          />
        )
      case 'circle':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.radius * 2}px`,
              height: `${shapeElement.radius * 2}px`,
              borderRadius: '50%'
            }}
          />
        )
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shapeElement.width / 2}px solid transparent`,
              borderRight: `${shapeElement.width / 2}px solid transparent`,
              borderBottom: `${shapeElement.height}px solid ${shapeElement.color}`,
              opacity: shapeElement.opacity
            }}
          />
        )
      case 'arrow':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.width}px`,
              height: `${shapeElement.height}px`,
              clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)'
            }}
          />
        )
      case 'star':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.width}px`,
              height: `${shapeElement.height}px`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        )
      case 'heart':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.width}px`,
              height: `${shapeElement.height}px`,
              clipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")'
            }}
          />
        )
      case 'line':
        return (
          <div
            style={{
              ...commonStyle,
              width: `${shapeElement.width}px`,
              height: `${shapeElement.height}px`
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`card-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        cursor: isDragging ? 'grabbing' : 'move',
        zIndex: isDragging ? 1000 : 'auto'
      }}
      onMouseDown={(e) => onMouseDown(e, index)}
      onClick={(e) => {
        e.stopPropagation()
        onClick(index)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (element.type === 'text' || element.type === 'art-text') {
          onClick(index)
        }
      }}
    >
      {renderElement()}
    </div>
  )
}

