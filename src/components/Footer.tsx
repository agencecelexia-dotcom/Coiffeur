import { Scissors, Phone, MapPin, Clock, Mail, Instagram, ChevronRight } from "lucide-react";
import Link from "next/link";
import { salonInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <Scissors className="h-5 w-5 text-gold-500" />
              <div className="flex flex-col leading-none">
                <span className="text-white text-lg font-serif tracking-wider">
                  Salon Élégance
                </span>
                <span className="text-[10px] text-gold-500 uppercase tracking-[0.25em] font-sans mt-0.5">
                  Paris 8e
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {salonInfo.tagline}. Votre salon de coiffure premium au cœur
              du 8e arrondissement de Paris, où expertise rime avec élégance.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-600/20 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4 text-gold-400" />
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-sans font-medium mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/tarifs", label: "Nos Tarifs & Prestations" },
                { href: "/reservation", label: "Réserver en Ligne" },
                { href: "/contact", label: "Contact & Horaires" },
                { href: "/admin", label: "Espace Admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="h-3 w-3 text-gold-600/50 group-hover:text-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-sans font-medium mb-5">
              Nos Prestations
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Coupes Femme & Homme",
                "Coloration & Balayage",
                "Soins & Kératine",
                "Barbe & Grooming",
                "Brushing & Coiffage",
              ].map((service) => (
                <li key={service}>
                  <Link href="/tarifs" className="hover:text-gold-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="h-3 w-3 text-gold-600/50 group-hover:text-gold-400 transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-sans font-medium mb-5">
              Informations
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <span>{salonInfo.address}, {salonInfo.postalCode} {salonInfo.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold-500 flex-shrink-0" />
                {salonInfo.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-500 flex-shrink-0" />
                {salonInfo.email}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <div>
                  Mar — Ven : 9h30 — 19h<br />
                  Samedi : 9h — 18h30<br />
                  <span className="text-gray-500">Lun & Dim : Fermé</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Salon Élégance. Tous droits réservés.</p>
          <p>Réalisé avec passion à Paris</p>
        </div>
      </div>
    </footer>
  );
}
