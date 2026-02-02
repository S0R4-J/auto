import { CarForm } from "@/components/admin/CarForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCarPage({
  params,
}: {
  params: { id: string };
}) {
  const car = await prisma.car.findUnique({ where: { id: params.id } });
  if (!car) notFound();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Редактировать автомобиль</h1>
      <CarForm car={car} />
    </div>
  );
}
