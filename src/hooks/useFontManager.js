import { useState } from 'react'

/**
 * Custom hook for managing custom fonts
 * @returns {Object} - Font state and upload function
 */
export const useFontManager = () => {
  const [customFonts, setCustomFonts] = useState([])

  const uploadCustomFont = async (file, onSuccess, onError) => {
    const validExtensions = ['.ttf', '.otf', '.woff', '.woff2']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()

    if (!validExtensions.includes(fileExtension)) {
      onError('Invalid font file format. Please upload TTF, OTF, WOFF, or WOFF2 files.')
      return
    }

    try {
      const fontName = file.name.replace(/\.[^/.]+$/, '')
      const fontUrl = URL.createObjectURL(file)
      const font = new FontFace(fontName, `url(${fontUrl})`)

      await font.load()
      document.fonts.add(font)

      setCustomFonts(prev => [...prev, { name: fontName, url: fontUrl }])
      onSuccess(`Font "${file.name}" uploaded successfully!`)
    } catch (error) {
      onError('Font loading failed, please ensure the file format is correct')
    }
  }

  return {
    customFonts,
    uploadCustomFont
  }
}

