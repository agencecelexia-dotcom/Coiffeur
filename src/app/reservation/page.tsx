import { prisma } from "@/lib/prisma";
import { BookingWizard } from "@/components/BookingWizard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Réserver en ligne | Salon Élégance",
  description: "Réservez votre rendez-vous en ligne au Salon Élégance. Choisissez votre prestation, votre coiffeur et votre créneau.",
};

export default async function ReservationPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { active: true },
        orderBy: { price: "asc" },
      },
    },
  });

  const staff = await prisma.staffMember.findMany({
    where: { active: true },
    orderBy: { firstName: "asc" },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-3">
            Rendez-vous
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            Réserver en ligne
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            En quelques étapes, choisissez votre prestation, votre coiffeur et le créneau qui vous convient.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard categories={categories} staff={staff} />
        </div>
      </section>
    </>
  );
}
