import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-9xl font-extrabold tracking-widest text-primary">404</h1>
      <div className="absolute rotate-12 rounded bg-foreground px-2 text-sm text-background">
        Страница не найдена
      </div>
      <p className="mt-8 text-lg text-muted-foreground">
        Извините, мы не можем найти страницу, которую вы ищете.
      </p>
      <Button asChild className="mt-10">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
