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
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Scissors className="h-6 w-6 text-gold-600 group-hover:rotate-45 transition-transform" />
            <span className="text-xl font-light tracking-widest uppercase">
              Salon Élégance
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider text-gray-600 hover:text-gold-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/reservation" className="btn-primary text-sm py-2 px-5">
              Prendre RDV
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm uppercase tracking-wider text-gray-600 hover:text-gold-600 py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservation"
              onClick={() => setMenuOpen(false)}
              className="btn-primary block text-center text-sm py-2 mt-2"
            >
              Prendre RDV
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
