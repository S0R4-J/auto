"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-3xl font-bold">Что-то пошло не так!</h2>
      <p className="mb-8 text-muted-foreground">
        Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Попробовать снова</Button>
        <Button variant="outline" asChild>
          <a href="/">На главную</a>
        </Button>
      </div>
    </div>
  );
}
