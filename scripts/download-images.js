const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(path.join(imagesDir, filename));
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Define all images to download
const images = [
  {
    url: 'https://placehold.co/1920x1080/1a1a1a/ffffff/png?text=Hero+Background',
    filename: 'hero-bg.jpg'
  },
  {
    url: 'https://placehold.co/1920x1080/1a1a1a/ffffff/png?text=About+Hero',
    filename: 'about-hero.jpg'
  },
  {
    url: 'https://placehold.co/1920x1080/1a1a1a/ffffff/png?text=Contact+Hero',
    filename: 'contact-hero.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=About+Image',
    filename: 'about-image.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Product+1',
    filename: 'product-1.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Product+2',
    filename: 'product-2.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Product+3',
    filename: 'product-3.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Product+4',
    filename: 'product-4.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Mission+Image',
    filename: 'mission-image.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Team+Member+1',
    filename: 'team-1.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Team+Member+2',
    filename: 'team-2.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Team+Member+3',
    filename: 'team-3.jpg'
  },
  {
    url: 'https://placehold.co/800x800/1a1a1a/ffffff/png?text=Office+Location',
    filename: 'office-location.jpg'
  }
];

// Download all images
async function downloadAllImages() {
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 