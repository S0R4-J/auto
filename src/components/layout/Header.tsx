import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="glass-panel fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          PREMIUM CARS
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/#catalog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Автопарк
          </Link>
          <Link href="/terms" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Условия
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            О нас
          </Link>
          <Link href="/contacts" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Контакты
          </Link>
        </nav>
        <Button asChild variant="default" size="sm" className="rounded-full px-6 bg-white text-black hover:bg-gray-200">
          <Link href="/contacts">Заказать звонок</Link>
        </Button>
      </div>
    </header>
  );
}
