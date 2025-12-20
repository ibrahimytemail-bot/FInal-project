// Helper to dynamically import all images from a category folder
const importAll = (r) => r.keys().map(r);

// Import all product images by category
const productImages = {
  airpodes: importAll(require.context('../assest/products/airpodes', false, /\.(webp|jpg|jpeg|png)$/)),
  watches: importAll(require.context('../assest/products/watches', false, /\.(webp|jpg|jpeg|png)$/)),
  camera: importAll(require.context('../assest/products/camera', false, /\.(webp|jpg|jpeg|png)$/)),
  earphones: importAll(require.context('../assest/products/earphones', false, /\.(webp|jpg|jpeg|png)$/)),
  Mouse: importAll(require.context('../assest/products/mouse', false, /\.(webp|jpg|jpeg|png)$/)),
  televisions: importAll(require.context('../assest/products/TV', false, /\.(webp|jpg|jpeg|png)$/)),
  speakers: importAll(require.context('../assest/products/speakers', false, /\.(webp|jpg|jpeg|png)$/)),
  refrigerator: importAll(require.context('../assest/products/refrigerator', false, /\.(webp|jpg|jpeg|png)$/)),
  trimmers: importAll(require.context('../assest/products/trimmers', false, /\.(webp|jpg|jpeg|png)$/)),
  processor: importAll(require.context('../assest/products/processor', false, /\.(webp|jpg|jpeg|png)$/)),
  printers: importAll(require.context('../assest/products/printers', false, /\.(webp|jpg|jpeg|png)$/)),
  mobiles: importAll(require.context('../assest/products/mobile', false, /\.(webp|jpg|jpeg|png)$/)),
};

/**
 * Get images for a specific category
 * @param {string} category - The category name
 * @param {number} limit - Maximum number of images to return (default: 4)
 * @returns {Array} - Array of image URLs
 */
export const getCategoryImages = (category, limit = 4) => {
  const categoryImages = productImages[category] || [];
  return categoryImages.slice(0, limit);
};

/**
 * Get all available categories
 * @returns {Array} - Array of category names
 */
export const getAvailableCategories = () => {
  return Object.keys(productImages);
};

/**
 * Get random images from all categories
 * @param {number} limit - Maximum number of images to return (default: 12)
 * @returns {Array} - Array of objects with url, category, and id
 */
export const getRandomImagesFromAllCategories = (limit = 12) => {
  const allImages = [];
  
  // Collect all images from all categories
  Object.keys(productImages).forEach(category => {
    const categoryImages = productImages[category];
    categoryImages.forEach((url, index) => {
      allImages.push({
        url,
        category,
        filename: `${category}-${index}`,
        id: `local-${category}-${index}`
      });
    });
  });
  
  // Shuffle the array and return the requested number of images
  const shuffled = allImages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

export default productImages;
