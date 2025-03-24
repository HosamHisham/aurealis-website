const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create a placeholder image
function createPlaceholder(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#9ca3af';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
}

// Create all placeholder images
const images = [
  { width: 1920, height: 1080, text: 'Hero Background', filename: 'hero-bg.jpg' },
  { width: 1920, height: 1080, text: 'About Hero', filename: 'about-hero.jpg' },
  { width: 1920, height: 1080, text: 'Contact Hero', filename: 'contact-hero.jpg' },
  { width: 800, height: 800, text: 'Product 1', filename: 'product-1.jpg' },
  { width: 800, height: 800, text: 'Product 2', filename: 'product-2.jpg' },
  { width: 800, height: 800, text: 'Product 3', filename: 'product-3.jpg' },
  { width: 800, height: 800, text: 'Product 4', filename: 'product-4.jpg' },
  { width: 800, height: 800, text: 'Mission Image', filename: 'mission-image.jpg' },
  { width: 800, height: 800, text: 'Team Member 1', filename: 'team-1.jpg' },
  { width: 800, height: 800, text: 'Team Member 2', filename: 'team-2.jpg' },
  { width: 800, height: 800, text: 'Team Member 3', filename: 'team-3.jpg' },
  { width: 800, height: 800, text: 'Office Location', filename: 'office-location.jpg' },
];

images.forEach(image => {
  createPlaceholder(image.width, image.height, image.text, image.filename);
  console.log(`Created ${image.filename}`);
}); 