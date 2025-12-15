import { useState, useEffect } from 'react'

/**
 * Custom hook for drag and drop functionality
 * @returns {Object} - Drag and drop state and handlers
 */
export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [draggedElement, setDraggedElement] = useState(null)

  const handleMouseDown = (e, elementIndex, element, cardRect) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    setDraggedElement(elementIndex)
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - cardRect.left - element.x,
      y: e.clientY - cardRect.top - element.y
    })
  }

  const createMouseMoveHandler = (cardRef, cardData, setCardData) => {
    return (e) => {
      if (!isDragging || draggedElement === null || !cardRef.current) return

      const cardRect = cardRef.current.getBoundingClientRect()
      const newX = e.clientX - cardRect.left - dragOffset.x
      const newY = e.clientY - cardRect.top - dragOffset.y

      const updatedElements = [...cardData.elements]
      updatedElements[draggedElement] = {
        ...updatedElements[draggedElement],
        x: Math.max(0, Math.min(newX, cardRect.width - 50)),
        y: Math.max(0, Math.min(newY, cardRect.height - 50))
      }

      setCardData({
        ...cardData,
        elements: updatedElements
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedElement(null)
  }

  return {
    isDragging,
    dragOffset,
    draggedElement,
    handleMouseDown,
    createMouseMoveHandler,
    handleMouseUp
  }
}

