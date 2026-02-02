import { Hero } from "@/components/home/Hero";
import { CarCard } from "@/components/cars/CarCard";
import { getCars } from "@/lib/data";

export default async function Home() {
  const cars = await getCars();

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      <section id="catalog" className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-5xl">
            Наш автопарк
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Выберите автомобиль, который подчеркнет ваш статус
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}
