import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  const cars = [
    {
      name: 'Mercedes-Benz S-Class',
      slug: 'mercedes-s-class',
      price: 500,
      image: '/images/mercedes-s-class.png',
      bodyType: 'Sedan',
      brand: 'Mercedes-Benz',
      specs: JSON.stringify({ acceleration: '4.4s', power: '496hp' }),
    },
    {
      name: 'BMW 7 Series',
      slug: 'bmw-7-series',
      price: 480,
      image: '/images/bmw-7-series.png',
      bodyType: 'Sedan',
      brand: 'BMW',
      specs: JSON.stringify({ acceleration: '4.2s', power: '536hp' }),
    },
    {
      name: 'Porsche 911 Carrera',
      slug: 'porsche-911',
      price: 700,
      image: '/images/porsche-911.png',
      bodyType: 'Coupe',
      brand: 'Porsche',
      specs: JSON.stringify({ acceleration: '3.8s', power: '379hp' }),
    },
    {
      name: 'Range Rover Autobiography',
      slug: 'range-rover',
      price: 600,
      image: '/images/range-rover.png',
      bodyType: 'SUV',
      brand: 'Land Rover',
      specs: JSON.stringify({ acceleration: '5.7s', power: '523hp' }),
    },
    {
      name: 'Lamborghini Urus',
      slug: 'lamborghini-urus',
      price: 1200,
      image: '/images/lamborghini-urus.png',
      bodyType: 'SUV',
      brand: 'Lamborghini',
      specs: JSON.stringify({ acceleration: '3.1s', power: '641hp' }),
    },
  ]

  for (const car of cars) {
    await prisma.car.upsert({
      where: { slug: car.slug },
      update: car,
      create: car,
    })
  }

  console.log('Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
