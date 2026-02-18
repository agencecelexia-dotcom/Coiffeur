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
  description: string;
  order: number;
  services: Service[];
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  specialties: string;
  experience: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  service: string;
}

export const categories: ServiceCategory[] = [
  {
    id: "cat-coupes",
    name: "Coupes & Coiffage",
    description: "Des coupes sur-mesure qui révèlent votre personnalité, réalisées par nos experts stylistes.",
    order: 1,
    services: [
      {
        id: "svc-01",
        name: "Coupe Femme",
        description: "Diagnostic capillaire, shampoing soin, coupe personnalisée et brushing de finition. Un moment de transformation complète.",
        duration: 60,
        price: 55,
        categoryId: "cat-coupes",
      },
      {
        id: "svc-02",
        name: "Coupe Homme",
        description: "Coupe tendance ou classique, shampoing et coiffage. Conseils personnalisés pour un style qui vous ressemble.",
        duration: 30,
        price: 30,
        categoryId: "cat-coupes",
      },
      {
        id: "svc-03",
        name: "Coupe Enfant",
        description: "Coupe adaptée aux enfants de moins de 12 ans, dans une atmosphère douce et bienveillante.",
        duration: 25,
        price: 20,
        categoryId: "cat-coupes",
      },
      {
        id: "svc-04",
        name: "Brushing",
        description: "Brushing lisse, bouclé ou volume selon vos envies. Tenue longue durée garantie.",
        duration: 30,
        price: 30,
        categoryId: "cat-coupes",
      },
      {
        id: "svc-05",
        name: "Coupe + Couleur",
        description: "Forfait combiné coupe sur-mesure et coloration pour un résultat harmonieux et complet.",
        duration: 120,
        price: 95,
        categoryId: "cat-coupes",
      },
    ],
  },
  {
    id: "cat-coloration",
    name: "Coloration & Techniques",
    description: "Des couleurs vibrantes et naturelles grâce à nos produits premium sans ammoniaque.",
    order: 2,
    services: [
      {
        id: "svc-06",
        name: "Coloration complète",
        description: "Coloration racines et longueurs avec des produits premium. Couleur intense, brillance et respect du cheveu.",
        duration: 90,
        price: 70,
        categoryId: "cat-coloration",
      },
      {
        id: "svc-07",
        name: "Balayage",
        description: "Technique de balayage naturel ou contrasté pour un effet soleil subtil. Le must de la coloration tendance.",
        duration: 120,
        price: 95,
        categoryId: "cat-coloration",
      },
      {
        id: "svc-08",
        name: "Mèches & Reflets",
        description: "Mèches fines ou larges, partielles ou complètes. Apportez de la lumière et de la dimension à votre chevelure.",
        duration: 90,
        price: 75,
        categoryId: "cat-coloration",
      },
      {
        id: "svc-09",
        name: "Ombré Hair",
        description: "Dégradé de couleur progressif des racines aux pointes pour un look moderne et facile à entretenir.",
        duration: 150,
        price: 110,
        categoryId: "cat-coloration",
      },
      {
        id: "svc-10",
        name: "Patine / Gloss",
        description: "Ravivez l'éclat de votre couleur entre deux colorations. Brillance immédiate et reflets sublimés.",
        duration: 45,
        price: 40,
        categoryId: "cat-coloration",
      },
    ],
  },
  {
    id: "cat-soins",
    name: "Soins & Rituels",
    description: "Des soins d'exception pour nourrir, réparer et sublimer vos cheveux en profondeur.",
    order: 3,
    services: [
      {
        id: "svc-11",
        name: "Soin Profond Réparateur",
        description: "Rituel nourrissant intense pour cheveux abîmés ou desséchés. Shampoing, masque et massage crânien relaxant.",
        duration: 45,
        price: 40,
        categoryId: "cat-soins",
      },
      {
        id: "svc-12",
        name: "Lissage Kératine",
        description: "Traitement lissant longue durée à la kératine. Cheveux soyeux, disciplinés et protégés pour 3 à 6 mois.",
        duration: 150,
        price: 180,
        categoryId: "cat-soins",
      },
      {
        id: "svc-13",
        name: "Botox Capillaire",
        description: "Soin anti-âge pour la fibre capillaire. Redonne volume, souplesse et éclat aux cheveux ternes et fatigués.",
        duration: 90,
        price: 120,
        categoryId: "cat-soins",
      },
      {
        id: "svc-14",
        name: "Rituel Détente",
        description: "Shampoing aux huiles essentielles, massage crânien de 20 minutes et soin hydratant. Pure relaxation.",
        duration: 40,
        price: 35,
        categoryId: "cat-soins",
      },
    ],
  },
  {
    id: "cat-barbe",
    name: "Barbe & Grooming",
    description: "L'art du barbier traditionnel revisité avec des techniques modernes pour le gentleman d'aujourd'hui.",
    order: 4,
    services: [
      {
        id: "svc-15",
        name: "Taille de Barbe",
        description: "Taille, sculpture et entretien de barbe aux ciseaux et tondeuse. Contours nets et barbe parfaitement dessinée.",
        duration: 25,
        price: 20,
        categoryId: "cat-barbe",
      },
      {
        id: "svc-16",
        name: "Rasage Traditionnel",
        description: "L'expérience du rasage au coupe-chou : serviette chaude, mousse onctueuse, rasage de précision et baume apaisant.",
        duration: 35,
        price: 35,
        categoryId: "cat-barbe",
      },
      {
        id: "svc-17",
        name: "Forfait Coupe + Barbe",
        description: "Coupe homme et taille de barbe complète. Le duo parfait pour un look soigné de la tête à la barbe.",
        duration: 50,
        price: 45,
        categoryId: "cat-barbe",
      },
    ],
  },
];

export const staff: StaffMember[] = [
  {
    id: "staff-sophie",
    firstName: "Sophie",
    lastName: "Martin",
    role: "Directrice Artistique",
    bio: "Passionnée par l'art de la couleur depuis plus de 15 ans, Sophie sublime chaque cliente avec des colorations sur-mesure. Formée à Londres et Paris auprès des plus grands coloristes, elle maîtrise les techniques les plus pointues du balayage au tie & dye.",
    specialties: "Coloration,Balayage,Ombré Hair,Coupe Femme",
    experience: 15,
  },
  {
    id: "staff-lucas",
    firstName: "Lucas",
    lastName: "Bernard",
    role: "Barbier Expert",
    bio: "Lucas allie la tradition du barbier d'antan aux tendances actuelles. Son expertise du rasage au coupe-chou et sa précision dans les coupes font de lui une référence du grooming masculin. Il transforme chaque passage au salon en une expérience unique.",
    specialties: "Coupe Homme,Barbe,Rasage Traditionnel,Grooming",
    experience: 10,
  },
  {
    id: "staff-emma",
    firstName: "Emma",
    lastName: "Dubois",
    role: "Styliste & Experte Soins",
    bio: "Diplômée en trichologie et formée aux rituels capillaires japonais, Emma est notre experte des cheveux en quête de renaissance. Son approche holistique allie techniques de coupe modernes et soins profonds pour révéler la beauté naturelle de chaque chevelure.",
    specialties: "Soins,Kératine,Botox Capillaire,Coupe Femme",
    experience: 12,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marie L.",
    text: "Un salon d'exception ! Sophie a réalisé un balayage absolument magnifique. Le résultat est naturel et lumineux, exactement ce que je voulais. Je ne changerai plus jamais de salon.",
    rating: 5,
    service: "Balayage",
  },
  {
    id: "t2",
    name: "Thomas R.",
    text: "Le rasage traditionnel chez Lucas est une vraie expérience. La serviette chaude, le coupe-chou... On se sent comme un roi. Et la coupe est toujours impeccable.",
    rating: 5,
    service: "Rasage Traditionnel",
  },
  {
    id: "t3",
    name: "Camille D.",
    text: "Emma a sauvé mes cheveux avec le soin kératine. Après des années de lisseur, ils étaient très abîmés. Aujourd'hui ils sont soyeux et en pleine santé. Merci !",
    rating: 5,
    service: "Lissage Kératine",
  },
  {
    id: "t4",
    name: "Julie P.",
    text: "L'ambiance est chaleureuse et raffinée, les produits sont de qualité et l'équipe est vraiment à l'écoute. Un vrai moment de bien-être à chaque visite.",
    rating: 5,
    service: "Coupe Femme",
  },
];

export const salonInfo = {
  name: "Salon Élégance",
  tagline: "L'art de la coiffure depuis 2010",
  address: "12 Rue du Faubourg Saint-Honoré",
  city: "Paris",
  postalCode: "75008",
  phone: "01 42 65 78 90",
  email: "contact@salon-elegance.fr",
  instagram: "@salon.elegance.paris",
  openingHours: [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "9h30 — 19h00" },
    { day: "Mercredi", hours: "9h30 — 19h00" },
    { day: "Jeudi", hours: "9h30 — 20h00" },
    { day: "Vendredi", hours: "9h30 — 20h00" },
    { day: "Samedi", hours: "9h00 — 18h30" },
    { day: "Dimanche", hours: "Fermé" },
  ],
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
