const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Directory containing images
const imagesDir = path.resolve("./public");

// Process each image
fs.readdirSync(imagesDir)
  .filter((file) => file.includes(".png"))
  .forEach(async (file) => {
    const filePath = path.join(imagesDir, file);
    const [baseName] = file.split(".png");

    // Resize and convert images as needed
    await sharp(filePath)
      .resize(800) // Resize to width of 800 pixels
      .webp() // Convert to webp
      .toFile(path.resolve(imagesDir, `${baseName}.webp`));
  });

console.log("Images optimized");
