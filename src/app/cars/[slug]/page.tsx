import { getCarBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking/BookingForm";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.name} | Premium Car Rental`,
    description: `Rent ${car.name} for $${car.price}/day. Premium service, best prices.`,
    openGraph: {
      images: [car.image],
    },
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  let specs = {};
  try {
    specs = JSON.parse(car.specs);
  } catch (e) {
    console.error("Failed to parse specs", e);
  }

  return (
    <div className="container mx-auto px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery Section */}
        <div className="glass-card relative aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="outline" className="mb-2 text-lg border-white/20 text-white">
              {car.brand}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl text-white">
              {car.name}
            </h1>
            <p className="mt-2 text-2xl font-semibold text-white">
              ${car.price} <span className="text-base text-gray-400">/ сутки</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specs).map(([key, value]) => (
              <Card key={key} className="glass-card border-none">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-sm capitalize text-gray-400">{key}</span>
                  <span className="text-lg font-bold text-white">{value as string}</span>
                </CardContent>
              </Card>
            ))}
            <Card className="glass-card border-none">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sm text-gray-400">Кузов</span>
                <span className="text-lg font-bold text-white">{car.bodyType}</span>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-white">Забронировать этот автомобиль</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm carId={car.id} pricePerDay={car.price} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
