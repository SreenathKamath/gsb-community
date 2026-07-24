const creatorImageContext = require.context(
  "../assets/images/creators",
  false,
  /^\.\/creator_(\d+)\.(png|jpe?g|webp|svg)$/i
);

export const creatorImages = creatorImageContext.keys().reduce((images, imagePath) => {
  const match = imagePath.match(/creator_(\d+)/i);
  if (match) {
    images[String(Number(match[1]))] = creatorImageContext(imagePath);
  }

  return images;
}, {});
