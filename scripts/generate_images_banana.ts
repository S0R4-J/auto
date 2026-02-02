
import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyBhL0tfD7kfw-mVJwmOTSvHAR6etIgVevM';
const MODEL = 'gemini-3-pro-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const cars = [
  { name: 'Mercedes-Benz S-Class', slug: 'mercedes-s-class' },
  { name: 'BMW 7 Series', slug: 'bmw-7-series' },
  { name: 'Porsche 911 Carrera', slug: 'porsche-911' },
  { name: 'Range Rover Autobiography', slug: 'range-rover' },
  { name: 'Lamborghini Urus', slug: 'lamborghini-urus' },
];

async function generateImage(carName: string) {
  const prompt = `Professional studio photography of a ${carName}, side profile, white background, soft lighting, 4k resolution, photorealistic`;

  console.log(`Requesting image for ${carName} using model ${MODEL}...`);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  
  // Check for inline data (base64 image)
  // Gemini image generation usually returns inlineData in parts
  const part = data.candidates?.[0]?.content?.parts?.[0];
  
  if (part?.inlineData) {
    return Buffer.from(part.inlineData.data, 'base64');
  }
  
  if (part?.text) {
     throw new Error(`Model returned text instead of image: ${part.text}`);
  }

  throw new Error('No image data found in response');
}

async function main() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const car of cars) {
    console.log(`Generating image for ${car.name}...`);
    try {
      const imageBuffer = await generateImage(car.name);
      const filePath = path.join(imagesDir, `${car.slug}.png`);
      fs.writeFileSync(filePath, imageBuffer);
      console.log(`Saved to ${filePath}`);
    } catch (error) {
      console.error(`Failed to generate image for ${car.name}:`, error);
    }
  }
}

main();
