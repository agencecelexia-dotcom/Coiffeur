import Link from "next/link";
import {
  Scissors,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-4">
              Bienvenue chez
            </p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Salon
              <span className="block text-gold-400 font-normal">Élégance</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Votre salon de coiffure premium au coeur de Paris 8e.
              Coupes, colorations et soins réalisés par des experts passionnés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/reservation" className="btn-primary text-center text-lg py-4 px-8">
                Réserver en ligne
              </Link>
              <Link href="/tarifs" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-center text-lg py-4 px-8">
                Nos tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Nos expertises</p>
          <h2 className="section-title mb-16">Ce que nous vous proposons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scissors,
                title: "Coupes",
                desc: "Coupes femme, homme et enfant. Techniques adaptées à votre style.",
              },
              {
                icon: Sparkles,
                title: "Coloration",
                desc: "Coloration, balayage, mèches. Des couleurs éclatantes et durables.",
              },
              {
                icon: Star,
                title: "Soins",
                desc: "Soins profonds, kératine. Réparez et sublimez vos cheveux.",
              },
              {
                icon: Calendar,
                title: "Sur rendez-vous",
                desc: "Réservez en ligne en quelques clics, 24h/24 et 7j/7.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-cream-200"
              >
                <item.icon className="h-10 w-10 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Pourquoi nous choisir</p>
          <h2 className="section-title mb-16">L&apos;excellence à votre service</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Star,
                title: "15 ans d'expérience",
                desc: "Une équipe de coiffeurs passionnés et régulièrement formés aux dernières tendances.",
              },
              {
                icon: Clock,
                title: "Réservation en ligne",
                desc: "Prenez rendez-vous en quelques clics. Choisissez votre créneau et votre coiffeur préféré.",
              },
              {
                icon: Sparkles,
                title: "Produits premium",
                desc: "Nous travaillons exclusivement avec des produits professionnels haut de gamme.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-gold-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Prêt(e) pour un nouveau look ?
          </h2>
          <p className="text-gray-400 mb-8">
            Réservez votre prochain rendez-vous en ligne en quelques clics.
          </p>
          <Link
            href="/reservation"
            className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8"
          >
            Réserver maintenant
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
