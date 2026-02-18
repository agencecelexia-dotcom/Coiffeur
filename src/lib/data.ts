// Static data for the salon — replace with database queries in Phase 2

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  categoryId: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  order: number;
  services: Service[];
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  specialties: string;
}

export const categories: ServiceCategory[] = [
  {
    id: "cat-coupes",
    name: "Coupes",
    order: 1,
    services: [
      { id: "svc-01", name: "Coupe Femme", description: "Coupe, shampoing et brushing", duration: 60, price: 45, categoryId: "cat-coupes" },
      { id: "svc-02", name: "Coupe Homme", description: "Coupe classique homme", duration: 30, price: 25, categoryId: "cat-coupes" },
      { id: "svc-03", name: "Coupe Enfant", description: "Coupe enfant (moins de 12 ans)", duration: 25, price: 18, categoryId: "cat-coupes" },
      { id: "svc-04", name: "Brushing", description: "Brushing simple", duration: 30, price: 25, categoryId: "cat-coupes" },
    ],
  },
  {
    id: "cat-coloration",
    name: "Coloration",
    order: 2,
    services: [
      { id: "svc-05", name: "Coloration complète", description: "Coloration racines et longueurs", duration: 90, price: 65, categoryId: "cat-coloration" },
      { id: "svc-06", name: "Balayage", description: "Balayage naturel ou contrasté", duration: 120, price: 85, categoryId: "cat-coloration" },
      { id: "svc-07", name: "Mèches", description: "Mèches partielles ou complètes", duration: 90, price: 70, categoryId: "cat-coloration" },
    ],
  },
  {
    id: "cat-soins",
    name: "Soins",
    order: 3,
    services: [
      { id: "svc-08", name: "Soin profond", description: "Soin nourrissant et réparateur", duration: 30, price: 30, categoryId: "cat-soins" },
      { id: "svc-09", name: "Soin Kératine", description: "Lissage brésilien à la kératine", duration: 120, price: 150, categoryId: "cat-soins" },
    ],
  },
  {
    id: "cat-barbe",
    name: "Barbe & Homme",
    order: 4,
    services: [
      { id: "svc-10", name: "Taille de barbe", description: "Taille et entretien de barbe", duration: 20, price: 15, categoryId: "cat-barbe" },
      { id: "svc-11", name: "Rasage traditionnel", description: "Rasage au coupe-chou", duration: 30, price: 25, categoryId: "cat-barbe" },
    ],
  },
];

export const staff: StaffMember[] = [
  {
    id: "staff-sophie",
    firstName: "Sophie",
    lastName: "Martin",
    bio: "Spécialiste coloration et balayage depuis 15 ans. Formée aux dernières techniques de mèches et de tie & dye.",
    specialties: "Coloration,Balayage,Coupe Femme",
  },
  {
    id: "staff-lucas",
    firstName: "Lucas",
    lastName: "Bernard",
    bio: "Expert en coupe homme et barbe. Passionné par les coupes tendance et le rasage traditionnel.",
    specialties: "Coupe Homme,Barbe,Rasage",
  },
  {
    id: "staff-emma",
    firstName: "Emma",
    lastName: "Dubois",
    bio: "Spécialiste des soins capillaires et du lissage. Diplômée en trichologie.",
    specialties: "Soins,Kératine,Coupe Femme",
  },
];

export const salonInfo = {
  name: "Salon Élégance",
  address: "12 Rue de la Beauté",
  city: "Paris",
  postalCode: "75008",
  phone: "01 23 45 67 89",
  email: "contact@salon-elegance.fr",
  openingTime: "09:00",
  closingTime: "19:00",
};

// Generate mock available time slots for the booking wizard demo
export function getAvailableSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 19; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
}
