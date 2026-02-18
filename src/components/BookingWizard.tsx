"use client";

import { useState } from "react";
import { Clock, User, Calendar, Check, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  specialties: string;
  experience: number;
}

interface BookingWizardProps {
  categories: Category[];
  staff: StaffMember[];
}

type Step = "service" | "staff" | "datetime" | "info" | "confirmation";

const STEPS: { key: Step; label: string }[] = [
  { key: "service", label: "Prestation" },
  { key: "staff", label: "Coiffeur" },
  { key: "datetime", label: "Date & Heure" },
  { key: "info", label: "Vos infos" },
  { key: "confirmation", label: "Confirmation" },
];

// Generate available time slots (9:30 - 19:00, every 30 min)
function generateSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 19; hour++) {
    if (hour === 9) {
      slots.push("09:30");
    } else {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
}

export function BookingWizard({ categories, staff }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.key === currentStep);
  const availableSlots = generateSlots();

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setCurrentStep(next.key);
  };

  const goPrev = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setCurrentStep(prev.key);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSubmit = () => {
    setConfirmed(true);
    setCurrentStep("confirmation");
  };

  // Generate next 30 days for date picker (skip Sundays and Mondays)
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-12 gap-1">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium font-sans transition-all ${
                i <= stepIndex
                  ? "bg-gold-600 text-white shadow-lg shadow-gold-600/20"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs ml-1.5 mr-3 font-sans ${
                i <= stepIndex ? "text-gold-700 font-medium" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 sm:w-10 h-0.5 rounded-full transition-colors ${
                  i < stepIndex ? "bg-gold-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {currentStep === "service" && (
        <div>
          <h2 className="text-2xl mb-2">Choisissez votre prestation</h2>
          <p className="text-gray-500 text-sm mb-8">Sélectionnez le service qui vous convient parmi nos {categories.reduce((acc, c) => acc + c.services.length, 0)} prestations.</p>
          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-gold-600 mb-3 font-sans font-medium">
                  {cat.name}
                </h3>
                <div className="space-y-2">
                  {cat.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        goNext();
                      }}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:border-gold-400 hover:bg-gold-50/50 ${
                        selectedService?.id === service.id
                          ? "border-gold-500 bg-gold-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-base">{service.name}</p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 font-sans">
                            <Clock className="h-3 w-3" />
                            {service.duration} min
                          </div>
                        </div>
                        <span className="text-xl font-serif text-gold-700 ml-4">
                          {service.price}&nbsp;&euro;
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Staff Selection */}
      {currentStep === "staff" && (
        <div>
          <h2 className="text-2xl mb-2">Choisissez votre coiffeur</h2>
          <p className="text-gray-500 text-sm mb-8">Nos experts sont à votre service. Choisissez celui qui correspond le mieux à votre besoin.</p>
          <div className="space-y-3">
            {staff.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedStaff(member);
                  goNext();
                }}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:border-gold-400 hover:bg-gold-50/50 ${
                  selectedStaff?.id === member.id
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gold-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-base">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-gold-600 text-xs font-sans font-medium mt-0.5">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {member.specialties.split(",").map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-cream-200 text-gold-700 px-2.5 py-0.5 rounded-full font-sans"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Retour
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {currentStep === "datetime" && (
        <div>
          <h2 className="text-2xl mb-2">Choisissez la date et l&apos;heure</h2>
          <p className="text-gray-500 text-sm mb-8">Sélectionnez le créneau qui s&apos;adapte à votre emploi du temps.</p>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3 font-sans">
              <Calendar className="h-4 w-4 text-gold-600" />
              Date
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
              {dates.map((date) => {
                const d = new Date(date + "T12:00:00");
                const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
                const dayNum = d.getDate();
                const month = d.toLocaleDateString("fr-FR", { month: "short" });
                const isClosed = d.getDay() === 0 || d.getDay() === 1;

                return (
                  <button
                    key={date}
                    disabled={isClosed}
                    onClick={() => handleDateChange(date)}
                    className={`p-3 rounded-xl text-center text-sm transition-all ${
                      isClosed
                        ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                        : selectedDate === date
                        ? "bg-gold-600 text-white shadow-lg shadow-gold-600/20"
                        : "bg-white border border-gray-200 hover:border-gold-400 hover:shadow-sm"
                    }`}
                  >
                    <span className="block text-xs capitalize font-sans">{dayName}</span>
                    <span className="block text-lg font-serif">{dayNum}</span>
                    <span className="block text-xs capitalize font-sans">{month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3 font-sans">
                <Clock className="h-4 w-4 text-gold-600" />
                Heure
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 rounded-xl text-sm font-medium font-sans transition-all ${
                      selectedTime === slot
                        ? "bg-gold-600 text-white shadow-lg shadow-gold-600/20"
                        : "bg-white border border-gray-200 hover:border-gold-400 hover:shadow-sm"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Retour
            </button>
            <button
              onClick={goNext}
              disabled={!selectedDate || !selectedTime}
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Client Info */}
      {currentStep === "info" && (
        <div>
          <h2 className="text-2xl mb-2">Vos informations</h2>
          <p className="text-gray-500 text-sm mb-8">Pour finaliser votre réservation, nous avons besoin de quelques informations.</p>

          {/* Summary */}
          <div className="bg-cream-100 rounded-2xl p-5 mb-8 text-sm space-y-2">
            <p className="text-xs uppercase tracking-wider text-gold-600 font-sans font-medium mb-2">Récapitulatif</p>
            <p><strong>Prestation :</strong> {selectedService?.name} — <span className="font-serif text-gold-700">{selectedService?.price} &euro;</span></p>
            <p><strong>Coiffeur :</strong> {selectedStaff?.firstName} {selectedStaff?.lastName}</p>
            <p>
              <strong>Date :</strong>{" "}
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              à {selectedTime}
            </p>
            <p><strong>Durée :</strong> {selectedService?.duration} min</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="booking-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Votre prénom"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="booking-lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom *
                </label>
                <input
                  type="text"
                  id="booking-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Votre nom"
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                id="booking-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                Téléphone
              </label>
              <input
                type="tel"
                id="booking-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="06 12 34 56 78"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="booking-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes / Préférences
              </label>
              <textarea
                id="booking-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Allergies, préférences particulières, inspiration..."
                className="input-field resize-none"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName || !formData.email}
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirmer le rendez-vous
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {currentStep === "confirmation" && confirmed && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl mb-3">Rendez-vous confirmé !</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Votre demande de rendez-vous a bien été enregistrée.
            Nous vous contacterons par email ou téléphone pour confirmer votre créneau.
          </p>
          <div className="bg-cream-100 rounded-2xl p-8 max-w-md mx-auto text-sm text-left space-y-3">
            <div className="flex items-center gap-2 text-gold-600 mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-sans font-medium">Détails de votre rendez-vous</span>
            </div>
            <p><strong>Prestation :</strong> {selectedService?.name}</p>
            <p><strong>Coiffeur :</strong> {selectedStaff?.firstName} {selectedStaff?.lastName}</p>
            <p>
              <strong>Date :</strong>{" "}
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              à {selectedTime}
            </p>
            <p><strong>Durée :</strong> {selectedService?.duration} min</p>
            <p><strong>Prix :</strong> <span className="font-serif text-gold-700">{selectedService?.price} &euro;</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
