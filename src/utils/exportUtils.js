import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// Export card as PDF
export const exportToPDF = async (cardElement, filename = 'greeting-card.pdf') => {
  try {
    // Capture the card element as canvas
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2, // Higher quality
      logging: false,
      useCORS: true
    })

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png')
    
    // Create PDF with proper dimensions
    // Standard greeting card size: 5x7 inches
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [7, 5]
    })

    pdf.addImage(imgData, 'PNG', 0, 0, 7, 5)
    pdf.save(filename)
    
    return { success: true }
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    return { success: false, error: error.message }
  }
}

// Export card as image
export const exportAsImage = async (cardElement, filename = 'greeting-card.png') => {
  try {
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    })

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error exporting as image:', error)
    return { success: false, error: error.message }
  }
}

// Get card as data URL for email
export const getCardDataURL = async (cardElement) => {
  try {
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    })

    return canvas.toDataURL('image/png')
  } catch (error) {
    console.error('Error getting card data URL:', error)
    throw error
  }
}

