import { prisma } from "@/lib/prisma";
import { Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nos Tarifs | Salon Élégance",
  description: "Découvrez nos tarifs pour coupes, colorations, soins et services barbe. Salon Élégance, Paris 8e.",
};

export default async function TarifsPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { active: true },
        orderBy: { price: "asc" },
      },
    },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-3">
            Nos prestations
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            Tarifs
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <p className="text-center text-gray-500">
              Les tarifs seront bientôt disponibles. Veuillez nous contacter pour plus d&apos;informations.
            </p>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category.id}>
                  <h2 className="text-2xl font-light tracking-wide mb-6 pb-2 border-b border-cream-200">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start justify-between gap-4 py-3"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium">{service.name}</h3>
                          {service.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {service.description}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <Clock className="h-3 w-3" />
                            {service.duration} min
                          </div>
                        </div>
                        <div className="text-lg font-medium text-gold-700 whitespace-nowrap">
                          {service.price.toFixed(0)} &euro;
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">
              Un conseil personnalisé ? Réservez directement en ligne.
            </p>
            <Link href="/reservation" className="btn-primary">
              Réserver un rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
