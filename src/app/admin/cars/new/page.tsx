import { CarForm } from "@/components/admin/CarForm";

export default function NewCarPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Добавить новый автомобиль</h1>
      <CarForm />
    </div>
  );
}
