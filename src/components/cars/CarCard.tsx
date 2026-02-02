"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car } from "@prisma/client";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  // Parse specs safely
  let specs = {};
  try {
    specs = JSON.parse(car.specs);
  } catch (e) {
    console.error("Failed to parse specs", e);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card group overflow-hidden transition-all hover:bg-white/10">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute right-4 top-4">
            <Badge variant="secondary" className="glass backdrop-blur-md border-none text-white bg-black/20">
              {car.bodyType}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{car.name}</h3>
            <span className="text-lg font-semibold text-white">
              ${car.price}<span className="text-sm text-gray-400">/day</span>
            </span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <span className="capitalize">{key}:</span>
                <span className="font-medium text-gray-200">{value as string}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full rounded-full bg-white text-black hover:bg-gray-200">
            <Link href={`/cars/${car.slug}`}>Забронировать</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
