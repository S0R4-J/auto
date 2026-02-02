"use client";

import { Button } from "@/components/ui/button";
import { deleteCar } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteCarButton({ carId }: { carId: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить этот автомобиль?")) {
      setIsPending(true);
      try {
        const result = await deleteCar(carId);
        if (result.success) {
          toast.success("Автомобиль удален");
          router.refresh();
        } else {
          toast.error("Произошла ошибка");
        }
      } catch {
        toast.error("Произошла ошибка");
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
