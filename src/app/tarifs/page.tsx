import { categories } from "@/lib/data";
import { Clock, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Nos Tarifs | Salon Élégance — Coiffeur Paris 8e",
  description: "Découvrez nos tarifs pour coupes, colorations, soins capillaires et services barbe. Salon Élégance, Paris 8e.",
};

export default function TarifsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-sans mb-4">
            Nos prestations
          </p>
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-4">
            Tarifs & Prestations
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Des prestations d&apos;exception à des tarifs justes.
            Chaque service inclut un diagnostic personnalisé et des produits premium.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <span>Tous nos tarifs comprennent un diagnostic capillaire, un shampoing soin et des conseils d&apos;entretien personnalisés.</span>
            <Sparkles className="h-4 w-4 text-gold-500" />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl tracking-tight mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{category.description}</p>
                  <div className="gold-divider mt-4 !mx-0" />
                </div>
                <div className="space-y-1">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between gap-4 py-5 border-b border-cream-200 last:border-b-0 group hover:bg-cream-50 -mx-4 px-4 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-base group-hover:text-gold-700 transition-colors">{service.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 font-sans">
                          <Clock className="h-3 w-3" />
                          {service.duration} min
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-serif text-gold-700">
                          {service.price}
                        </span>
                        <span className="text-sm text-gold-600 ml-0.5">&euro;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-16 bg-cream-100 rounded-2xl p-8 md:p-10">
            <h3 className="text-xl mb-3">Bon à savoir</h3>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Les tarifs sont donnés à titre indicatif et peuvent varier selon la longueur et l&apos;épaisseur des cheveux.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Un supplément longueur peut s&apos;appliquer pour les cheveux mi-longs et longs sur certaines prestations.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Pour toute prestation combinée, demandez nos forfaits avantageux lors de votre réservation.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Un diagnostic capillaire gratuit est réalisé avant chaque coloration ou soin.</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-2 text-lg">Séduit(e) par nos prestations ?</p>
            <p className="text-gray-400 mb-8 text-sm">
              Réservez en ligne et choisissez votre coiffeur et votre créneau préféré.
            </p>
            <Link href="/reservation" className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10 rounded-xl">
              Réserver un rendez-vous
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
