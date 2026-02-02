import fs from 'fs';
import path from 'path';

const cars = [
    { name: 'mercedes-s-class', color: '#1a1a1a', text: 'Mercedes-Benz S-Class' },
    { name: 'bmw-7-series', color: '#2f3542', text: 'BMW 7 Series' },
    { name: 'porsche-911', color: '#c0392b', text: 'Porsche 911 Carrera' },
    { name: 'range-rover', color: '#bdc3c7', text: 'Range Rover' },
    { name: 'lamborghini-urus', color: '#f1c40f', text: 'Lamborghini Urus' }
];

function generateSVG(text: string, color: string) {
    return `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}" />
  <text x="50%" y="50%" font-family="Arial" font-size="64" fill="white" text-anchor="middle" dy=".3em">${text}</text>
</svg>
`;
}

async function main() {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    for (const car of cars) {
        const svgContent = generateSVG(car.text, car.color);
        const outputPath = path.join(imagesDir, `${car.name}.svg`);
        fs.writeFileSync(outputPath, svgContent);
        console.log(`✅ Generated placeholder for ${car.name} at ${outputPath}`);
    }
}

main();
