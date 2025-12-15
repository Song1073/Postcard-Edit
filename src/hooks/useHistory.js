import { useState } from 'react'

/**
 * Custom hook for managing undo/redo history
 * @param {Object} initialState - Initial state
 * @returns {Object} - History management functions and state
 */
export const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState])
  const [historyIndex, setHistoryIndex] = useState(0)

  const addToHistory = (state) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(state)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = (setState) => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setState(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  const redo = (setState) => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setState(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return {
    history,
    historyIndex,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo
  }
}

