"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/#catalog" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
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
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
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
              <Link href="/#catalog" className="text-lg font-medium text-gray-300 hover:text-white" onClick={closeMenu}>
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
              <Button asChild variant="default" size="lg" className="mt-4 w-full rounded-full bg-white text-black hover:bg-gray-200" onClick={closeMenu}>
                <Link href="/contacts">Заказать звонок</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
