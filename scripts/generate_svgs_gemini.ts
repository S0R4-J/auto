
import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyBhL0tfD7kfw-mVJwmOTSvHAR6etIgVevM';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const cars = [
  { name: 'Mercedes-Benz S-Class', slug: 'mercedes-s-class' },
  { name: 'BMW 7 Series', slug: 'bmw-7-series' },
  { name: 'Porsche 911 Carrera', slug: 'porsche-911' },
  { name: 'Range Rover Autobiography', slug: 'range-rover' },
  { name: 'Lamborghini Urus', slug: 'lamborghini-urus' },
];

async function generateSVG(carName: string) {
  const prompt = `Generate a detailed, professional SVG code for a side view of a ${carName}. 
  Use a white background (or transparent). 
  Make it look realistic or high-quality vector art with gradients and details. 
  Do not include any text or explanations, just the SVG code.
  Start with <svg and end with </svg>.`;

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
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No text generated');
  }

  // Extract SVG from markdown code block if present
  const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/);
  if (svgMatch) {
    return svgMatch[0];
  }
  
  // If no svg tag found, maybe it's wrapped in ```xml ... ```
  const codeBlockMatch = text.match(/```xml([\s\S]*?)```/) || text.match(/```svg([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1];
  }

  return text;
}

async function main() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const car of cars) {
    console.log(`Generating image for ${car.name}...`);
    try {
      const svg = await generateSVG(car.name);
      const filePath = path.join(imagesDir, `${car.slug}.svg`);
      fs.writeFileSync(filePath, svg);
      console.log(`Saved to ${filePath}`);
    } catch (error) {
      console.error(`Failed to generate image for ${car.name}:`, error);
    }
  }
}

main();
