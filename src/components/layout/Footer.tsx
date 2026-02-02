import Link from "next/link";

export function Footer() {
  return (
    <footer className="glass-panel border-t border-white/10 py-12 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Premium Car Rental. All rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
