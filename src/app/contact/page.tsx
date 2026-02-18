import { MapPin, Phone, Mail, Clock, ChevronRight, Instagram } from "lucide-react";
import Link from "next/link";
import { salonInfo } from "@/lib/data";

export const metadata = {
  title: "Contact | Salon Élégance — Coiffeur Paris 8e",
  description: "Contactez le Salon Élégance à Paris 8e. Adresse, téléphone, horaires d'ouverture et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-sans mb-4">
            Nous trouver
          </p>
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Une question, un conseil ou une demande particulière ?
            Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Contact Info — Left Column */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl tracking-tight mb-8">
                Nos coordonnées
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Adresse</h3>
                    <p className="text-gray-500 leading-relaxed">
                      {salonInfo.address}<br />
                      {salonInfo.postalCode} {salonInfo.city}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Métro Madeleine (lignes 8, 12, 14)<br />
                      Métro Concorde (lignes 1, 8, 12)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-500">{salonInfo.phone}</p>
                    <p className="text-xs text-gray-400 mt-1">Aux horaires d&apos;ouverture du salon</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-500">{salonInfo.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Réponse sous 24h en jours ouvrés</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Instagram</h3>
                    <p className="text-gray-500">{salonInfo.instagram}</p>
                    <p className="text-xs text-gray-400 mt-1">Suivez nos réalisations au quotidien</p>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5 text-gold-600" />
                  <h3 className="text-xl">Horaires d&apos;ouverture</h3>
                </div>
                <div className="bg-cream-100 rounded-2xl p-6">
                  <div className="space-y-3">
                    {salonInfo.openingHours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className={item.hours === "Fermé" ? "text-gray-400" : "text-gray-700 font-medium"}>
                          {item.day}
                        </span>
                        <span className={item.hours === "Fermé" ? "text-gray-400 italic" : "text-gray-600"}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-cream-200">
                    Nocturne le jeudi et vendredi jusqu&apos;à 20h.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form — Right Column */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl tracking-tight mb-3">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Pour une demande de renseignement, un conseil personnalisé ou toute question
                sur nos prestations, remplissez le formulaire ci-dessous. Nous vous répondrons
                dans les plus brefs délais.
              </p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Votre prénom"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Votre nom"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre@email.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="06 12 34 56 78"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="input-field"
                    defaultValue=""
                  >
                    <option value="" disabled>Choisissez un sujet</option>
                    <option value="info">Demande d&apos;information</option>
                    <option value="rdv">Question sur un rendez-vous</option>
                    <option value="conseil">Conseil personnalisé</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre demande..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-base py-3.5 rounded-xl">
                  Envoyer le message
                </button>
                <p className="text-xs text-gray-400 text-center">
                  En envoyant ce formulaire, vous acceptez que vos données soient traitées pour répondre à votre demande.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-gradient-to-br from-gray-200 to-gray-300 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Carte interactive</p>
          <p className="text-gray-400 text-sm font-sans mt-1">
            {salonInfo.address}, {salonInfo.postalCode} {salonInfo.city}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-100 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl tracking-tight mb-4">
            Préférez-vous réserver directement ?
          </h2>
          <p className="text-gray-500 mb-8">
            Choisissez votre prestation, votre coiffeur et votre créneau en quelques clics.
          </p>
          <Link href="/reservation" className="btn-primary inline-flex items-center gap-2 py-4 px-10 rounded-xl">
            Réserver en ligne
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
