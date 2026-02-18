import Link from "next/link";
import {
  Scissors,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  Heart,
  Award,
  Quote,
  User,
  MapPin,
  Phone,
} from "lucide-react";
import { staff, testimonials, categories, salonInfo } from "@/lib/data";

export default function HomePage() {
  const totalServices = categories.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-sm font-sans uppercase tracking-[0.4em] mb-6">
              Bienvenue chez
            </p>
            <h1 className="text-6xl md:text-8xl font-normal tracking-tight mb-6 leading-[0.9]">
              Salon
              <span className="block text-gold-400 italic">Élégance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-xl leading-relaxed font-light">
              L&apos;art de la coiffure au cœur du 8e arrondissement de Paris.
            </p>
            <p className="text-base text-gray-400 mb-10 max-w-lg leading-relaxed">
              Depuis 2010, notre équipe de stylistes passionnés sublime votre beauté naturelle
              avec des coupes sur-mesure, des colorations d&apos;exception et des soins premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/reservation" className="btn-primary text-center text-lg py-4 px-10 rounded-xl">
                Réserver un rendez-vous
              </Link>
              <Link href="/tarifs" className="btn-secondary border-white/20 text-white hover:bg-white/10 text-center text-lg py-4 px-10 rounded-xl">
                Découvrir nos prestations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-serif text-gold-600">15+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Années d&apos;expérience</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-serif text-gold-600">{totalServices}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Prestations</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-serif text-gold-600">{staff.length}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Experts passionnés</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-serif text-gold-600">4.9</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Note Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Nos expertises</p>
          <h2 className="section-title mb-4">L&apos;excellence capillaire</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
            Du diagnostic personnalisé à la mise en beauté finale, chaque prestation est un voyage
            vers la version la plus élégante de vous-même.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scissors,
                title: "Coupes & Coiffage",
                desc: "Coupes femme, homme et enfant réalisées sur-mesure. Chaque geste est pensé pour sublimer votre visage et exprimer votre personnalité.",
                count: categories[0]?.services.length ?? 0,
              },
              {
                icon: Sparkles,
                title: "Coloration & Techniques",
                desc: "Balayage, mèches, ombré hair... Des couleurs vibrantes et naturelles avec des produits premium qui respectent la fibre capillaire.",
                count: categories[1]?.services.length ?? 0,
              },
              {
                icon: Heart,
                title: "Soins & Rituels",
                desc: "Kératine, botox capillaire, soins profonds. Nos rituels réparateurs redonnent vie, éclat et douceur à vos cheveux.",
                count: categories[2]?.services.length ?? 0,
              },
              {
                icon: Award,
                title: "Barbe & Grooming",
                desc: "L'art du barbier revisité : rasage au coupe-chou, taille de barbe sculptée et soins dédiés pour le gentleman moderne.",
                count: categories[3]?.services.length ?? 0,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card text-center p-8 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-7 w-7 text-gold-600" />
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-xs text-gold-600 font-medium font-sans uppercase tracking-wider">{item.count} prestations</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tarifs" className="inline-flex items-center gap-2 text-gold-700 hover:text-gold-800 font-medium transition-colors">
              Voir tous nos tarifs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About / Story Section */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-600 text-xs uppercase tracking-[0.3em] font-sans mb-4">Notre histoire</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
                Un salon né de la passion
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondé en 2010 au cœur du prestigieux 8e arrondissement de Paris,
                  le Salon Élégance est né d&apos;une vision simple : offrir à chaque client
                  une expérience capillaire d&apos;exception, dans un écrin de raffinement et de bien-être.
                </p>
                <p>
                  Notre philosophie repose sur l&apos;écoute attentive, le diagnostic personnalisé
                  et la maîtrise des techniques les plus avancées. Nous sélectionnons avec exigence
                  des produits professionnels haut de gamme, respectueux de vos cheveux et de l&apos;environnement.
                </p>
                <p>
                  Chez nous, chaque rendez-vous est une parenthèse de luxe accessible.
                  Nos stylistes prennent le temps de comprendre vos envies, votre mode de vie
                  et la nature de vos cheveux pour créer un look qui vous ressemble vraiment.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <p className="text-3xl font-serif text-gold-600">2010</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Année de création</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-gold-600">37 ans</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">D&apos;expérience cumulée</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-gold-600">Paris 8e</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-sans">Emplacement premium</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gold-200 to-cream-300 rounded-3xl aspect-[4/5] flex items-center justify-center">
                <div className="text-center px-8">
                  <Scissors className="h-16 w-16 text-gold-600/40 mx-auto mb-6" />
                  <p className="text-gold-800/60 text-lg italic">&ldquo;La beauté commence au moment où vous décidez d&apos;être vous-même.&rdquo;</p>
                  <p className="text-gold-700/50 text-sm mt-3 font-sans">— Coco Chanel</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold-500/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-400/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Notre équipe</p>
          <h2 className="section-title mb-4">Des artistes à votre service</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
            Trois experts passionnés, formés aux dernières tendances et techniques,
            unis par l&apos;amour du métier et le souci du détail.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {staff.map((member) => (
              <div key={member.id} className="card p-8 text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <User className="h-10 w-10 text-gold-600" />
                </div>
                <h3 className="text-xl mb-1">{member.firstName} {member.lastName}</h3>
                <p className="text-gold-600 text-sm font-sans font-medium mb-4">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties.split(",").map((s) => (
                    <span key={s} className="text-xs bg-cream-200 text-gold-700 px-3 py-1 rounded-full font-sans">
                      {s.trim()}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 font-sans">{member.experience} ans d&apos;expérience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-sans text-center mb-10">Ce que disent nos clients</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center tracking-tight mb-16">
            Des expériences inoubliables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Quote className="h-8 w-8 text-gold-400/40 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-gold-400/70 text-xs font-sans">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Nos engagements</p>
          <h2 className="section-title mb-16">Pourquoi choisir Salon Élégance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Award,
                title: "Expertise reconnue",
                desc: "Nos stylistes sont régulièrement formés aux dernières techniques et tendances internationales. Chaque geste est maîtrisé, chaque conseil est expert.",
              },
              {
                icon: Heart,
                title: "Produits premium",
                desc: "Nous travaillons exclusivement avec des gammes professionnelles haut de gamme, sans sulfates ni parabènes, pour des résultats durables et des cheveux en pleine santé.",
              },
              {
                icon: Calendar,
                title: "Réservation en ligne 24h/24",
                desc: "Prenez rendez-vous en quelques clics, à tout moment. Choisissez votre prestation, votre coiffeur préféré et le créneau qui vous convient.",
              },
              {
                icon: Sparkles,
                title: "Diagnostic personnalisé",
                desc: "Chaque rendez-vous commence par une analyse approfondie de vos cheveux et de vos envies, pour un résultat toujours sur-mesure.",
              },
              {
                icon: Clock,
                title: "Respect de votre temps",
                desc: "Des créneaux maîtrisés, pas d'attente inutile. Nous valorisons votre temps autant que le nôtre pour une expérience fluide et agréable.",
              },
              {
                icon: Star,
                title: "Cadre d'exception",
                desc: "Un salon lumineux et raffiné au cœur de Paris, conçu pour votre confort. Chaque visite est une parenthèse de bien-être et d'élégance.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-gold-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-600 text-xs uppercase tracking-[0.3em] font-sans mb-4">Nous trouver</p>
              <h2 className="text-3xl md:text-4xl tracking-tight mb-6">
                Au cœur de Paris
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Idéalement situé dans le 8e arrondissement, à quelques pas des Champs-Élysées,
                notre salon vous accueille dans un cadre élégant et chaleureux.
                Métro Madeleine (lignes 8, 12, 14) ou Concorde (lignes 1, 8, 12).
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold-600" />
                  <span className="text-gray-700">{salonInfo.address}, {salonInfo.postalCode} {salonInfo.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold-600" />
                  <span className="text-gray-700">{salonInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold-600" />
                  <span className="text-gray-700">Mar — Ven : 9h30 — 19h / Sam : 9h — 18h30</span>
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-gold-700 hover:text-gold-800 font-medium mt-8 transition-colors">
                Voir les horaires complets <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl aspect-[4/3] flex items-center justify-center">
              <div className="text-center px-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Carte interactive</p>
                <p className="text-gray-400 text-sm font-sans mt-1">Disponible prochainement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-sans mb-6">Votre transformation commence ici</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 leading-tight">
            Prêt(e) pour un <br className="hidden sm:block" />
            <span className="italic text-gold-400">nouveau look</span> ?
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
            Réservez votre prochain rendez-vous en ligne et laissez nos experts
            révéler le meilleur de votre style.
          </p>
          <Link
            href="/reservation"
            className="btn-primary inline-flex items-center gap-3 text-lg py-5 px-12 rounded-xl"
          >
            Réserver maintenant
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
