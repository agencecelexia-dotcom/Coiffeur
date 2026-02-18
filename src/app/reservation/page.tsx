import { categories, staff } from "@/lib/data";
import { BookingWizard } from "@/components/BookingWizard";
import { Clock, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "Réserver en ligne | Salon Élégance — Coiffeur Paris 8e",
  description: "Réservez votre rendez-vous en ligne au Salon Élégance. Choisissez votre prestation, votre coiffeur et votre créneau.",
};

export default function ReservationPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-sans mb-4">
            Rendez-vous
          </p>
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-4">
            Réservez votre moment
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto leading-relaxed">
            En quelques étapes simples, choisissez votre prestation, votre coiffeur préféré
            et le créneau qui s&apos;adapte à votre emploi du temps.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-cream-200 py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-500" />
              Réservation en 2 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-gold-500" />
              Annulation gratuite 24h avant
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              Confirmation immédiate
            </span>
          </div>
        </div>
      </section>

      {/* Booking Wizard */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard categories={categories} staff={staff} />
        </div>
      </section>
    </>
  );
}
