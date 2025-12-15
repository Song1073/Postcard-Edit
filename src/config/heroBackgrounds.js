// Hero section background images configuration
// Add image file names from the public/image folder here
// Images should be placed in: public/image/

export const heroBackgroundImages = [
  'background1.jpg',
  'background2.jpg',
  'background3.jpg',
]

// Get a random background image or use the first one
export const getHeroBackground = () => {
  if (heroBackgroundImages.length === 0) {
    return null // Return null to use default gradient
  }
  
  const randomIndex = Math.floor(Math.random() * heroBackgroundImages.length)
  return `/image/${heroBackgroundImages[randomIndex]}`
}

// Get all background images
export const getAllHeroBackgrounds = () => {
  return heroBackgroundImages.map(img => `/image/${img}`)
}

// Get a background image different from the provided one
export const getDifferentBackground = (excludePath) => {
  if (heroBackgroundImages.length === 0) {
    return null
  }
  
  // If only one image, return it anyway
  if (heroBackgroundImages.length === 1) {
    return `/image/${heroBackgroundImages[0]}`
  }
  
  // Extract filename from path
  const excludeFileName = excludePath ? excludePath.replace('/image/', '') : null
  
  // Filter out the excluded image and disallow background3 for CTA
  const availableImages = heroBackgroundImages.filter(img => {
    const isExcluded = excludeFileName ? img === excludeFileName : false
    const isDisallowed = img === 'background3.jpg' // CTA must not use background3
    return !isExcluded && !isDisallowed
  })
  
  // Get random image from available ones
  const randomIndex = Math.floor(Math.random() * availableImages.length)
  return `/image/${availableImages[randomIndex]}`
}

