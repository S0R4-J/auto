"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="glass-panel fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white" onClick={closeMenu}>
          PREMIUM CARS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/#fleet" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Автопарк
          </Link>
          <Link href="/terms" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Условия
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            О нас
          </Link>
          <Link href="/contacts" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Контакты
          </Link>
          {isMounted && session && (
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
              Кабинет
            </Link>
          )}
        </nav>

        {/* Desktop Auth/Action */}
        <div className="hidden md:flex items-center gap-4">
          {isMounted && session ? (
            <div className="flex items-center gap-4">
              {(session.user as any).role === "admin" && (
                <Link href="/admin" className="text-sm font-medium text-primary hover:text-primary/80">
                  Админ
                </Link>
              )}
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => signOut()}>
                Выйти
              </Button>
              <Link href="/dashboard" className="flex items-center gap-2 text-white">
                <User size={20} />
                <span className="text-sm font-medium">{session.user?.name?.split(' ')[0]}</span>
              </Link>
            </div>
          ) : isMounted ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                <Link href="/api/auth/signin">Войти</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                <Link href="/register">Регистрация</Link>
              </Button>
            </div>
          ) : null}
          <Button asChild variant="default" size="sm" className="rounded-full px-6 bg-white text-black hover:bg-gray-200">
            <Link href="/contacts">Заказать звонок</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="container mx-auto flex flex-col gap-4 p-6">
              <Link href="/#fleet" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
                Автопарк
              </Link>
              <Link href="/terms" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
                Условия
              </Link>
              <Link href="/about" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
                О нас
              </Link>
              <Link href="/contacts" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
                Контакты
              </Link>
              {isMounted && session && (
                <Link href="/dashboard" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
                  Личный кабинет
                </Link>
              )}
              <div className="flex flex-col gap-2 mt-4">
                {isMounted && session ? (
                  <Button variant="outline" className="text-white border-white/20" onClick={() => { signOut(); closeMenu(); }}>
                    Выйти
                  </Button>
                ) : isMounted ? (
                  <Button variant="outline" className="text-white border-white/20" onClick={() => { signIn("google"); closeMenu(); }}>
                    Войти через Google
                  </Button>
                ) : null}
                <Button asChild variant="default" size="lg" className="w-full rounded-full bg-white text-black hover:bg-gray-200" onClick={closeMenu}>
                  <Link href="/contacts">Заказать звонок</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
