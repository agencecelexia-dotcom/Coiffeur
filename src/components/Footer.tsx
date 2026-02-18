import { Scissors, Phone, MapPin, Clock, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-gold-500" />
              <span className="text-white text-lg font-light tracking-widest uppercase">
                Salon Élégance
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Votre salon de coiffure premium au coeur de Paris.
              Expertise, élégance et bien-être depuis 2010.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gold-400 transition-colors">Accueil</Link></li>
              <li><Link href="/tarifs" className="hover:text-gold-400 transition-colors">Nos Tarifs</Link></li>
              <li><Link href="/reservation" className="hover:text-gold-400 transition-colors">Réserver en Ligne</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-4">
              Informations
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gold-500 flex-shrink-0" />
                12 Rue de la Beauté, 75008 Paris
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-500 flex-shrink-0" />
                01 23 45 67 89
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-500 flex-shrink-0" />
                contact@salon-elegance.fr
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <div>
                  Lun - Sam : 9h00 - 19h00<br />
                  Dimanche : Fermé
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Salon Élégance. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
