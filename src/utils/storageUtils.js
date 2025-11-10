// LocalStorage utilities for saving and loading designs

const STORAGE_KEY = 'greeting_card_designs'

export const saveDesign = (design) => {
  try {
    const designs = getSavedDesigns()
    const designWithTimestamp = {
      ...design,
      id: design.id || Date.now().toString(),
      savedAt: new Date().toISOString()
    }
    
    const existingIndex = designs.findIndex(d => d.id === designWithTimestamp.id)
    if (existingIndex >= 0) {
      designs[existingIndex] = designWithTimestamp
    } else {
      designs.push(designWithTimestamp)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs))
    return designWithTimestamp
  } catch (error) {
    console.error('Error saving design:', error)
    throw new Error('Failed to save design')
  }
}

export const getSavedDesigns = () => {
  try {
    const designs = localStorage.getItem(STORAGE_KEY)
    return designs ? JSON.parse(designs) : []
  } catch (error) {
    console.error('Error loading designs:', error)
    return []
  }
}

export const getDesignById = (id) => {
  const designs = getSavedDesigns()
  return designs.find(d => d.id === id)
}

export const deleteDesign = (id) => {
  try {
    const designs = getSavedDesigns()
    const filteredDesigns = designs.filter(d => d.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDesigns))
    return true
  } catch (error) {
    console.error('Error deleting design:', error)
    return false
  }
}

export const clearAllDesigns = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing designs:', error)
    return false
  }
}

