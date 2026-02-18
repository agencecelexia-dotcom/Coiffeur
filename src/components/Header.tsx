"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scissors } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/reservation", label: "Réserver" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-cream-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Scissors className="h-5 w-5 text-gold-600 group-hover:rotate-45 transition-transform duration-300" />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-serif tracking-wider">
                Salon Élégance
              </span>
              <span className="text-[10px] text-gold-600 uppercase tracking-[0.25em] font-sans mt-0.5">
                Paris 8e
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-gray-600 hover:text-gold-600 transition-colors font-sans font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/reservation" className="btn-primary text-sm py-2.5 px-6 rounded-lg font-sans">
              Prendre RDV
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gold-600 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-cream-200 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.15em] text-gray-600 hover:text-gold-600 hover:bg-cream-50 py-3 px-3 rounded-lg transition-colors font-sans font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservation"
              onClick={() => setMenuOpen(false)}
              className="btn-primary block text-center text-sm py-3 mt-3 rounded-lg font-sans"
            >
              Prendre RDV
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
