// src/utils/preloadImages.js
export const preloadImages = (imageUrls) => {
  return imageUrls.map((url) => {
    const img = new Image();
    img.src = url;
    return img;
  });
};
