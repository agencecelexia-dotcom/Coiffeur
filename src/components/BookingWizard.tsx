"use client";

import { useState } from "react";
import { Clock, User, Calendar, Check, ChevronRight, ChevronLeft } from "lucide-react";

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
  services: Service[];
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  specialties: string;
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

export function BookingWizard({ categories, staff }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const stepIndex = STEPS.findIndex((s) => s.key === currentStep);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setCurrentStep(next.key);
  };

  const goPrev = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setCurrentStep(prev.key);
  };

  const fetchSlots = async (staffId: string, date: string) => {
    if (!selectedService) return;
    setLoadingSlots(true);
    setAvailableSlots([]);
    try {
      const res = await fetch(
        `/api/availability?staffId=${staffId}&date=${date}&duration=${selectedService.duration}`
      );
      const data = await res.json();
      setAvailableSlots(data.slots || []);
    } catch {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    if (selectedStaff) {
      fetchSlots(selectedStaff.id, date);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService!.id,
          staffId: selectedStaff!.id,
          date: selectedDate,
          time: selectedTime,
          ...formData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setConfirmed(true);
      setCurrentStep("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la réservation");
    } finally {
      setSubmitting(false);
    }
  };

  // Generate next 30 days for date picker
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-10 gap-1">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i <= stepIndex
                  ? "bg-gold-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs ml-1 mr-3 ${
                i <= stepIndex ? "text-gold-700 font-medium" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 sm:w-8 h-0.5 ${
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
          <h2 className="text-xl font-medium mb-6">Choisissez votre prestation</h2>
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm uppercase tracking-widest text-gold-600 mb-3">
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
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-gold-400 hover:bg-gold-50 ${
                        selectedService?.id === service.id
                          ? "border-gold-500 bg-gold-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          {service.description && (
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                            <Clock className="h-3 w-3" />
                            {service.duration} min
                          </div>
                        </div>
                        <span className="text-lg font-medium text-gold-700">
                          {service.price.toFixed(0)}&nbsp;&euro;
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
          <h2 className="text-xl font-medium mb-6">Choisissez votre coiffeur</h2>
          <div className="space-y-3">
            {staff.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedStaff(member);
                  goNext();
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-gold-400 hover:bg-gold-50 ${
                  selectedStaff?.id === member.id
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {member.firstName} {member.lastName}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
                    )}
                    {member.specialties && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.specialties.split(",").map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-cream-200 text-gold-700 px-2 py-0.5 rounded"
                          >
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Retour
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {currentStep === "datetime" && (
        <div>
          <h2 className="text-xl font-medium mb-6">Choisissez la date et l&apos;heure</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-60 overflow-y-auto">
              {dates.map((date) => {
                const d = new Date(date + "T12:00:00");
                const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
                const dayNum = d.getDate();
                const month = d.toLocaleDateString("fr-FR", { month: "short" });
                const isSunday = d.getDay() === 0;

                return (
                  <button
                    key={date}
                    disabled={isSunday}
                    onClick={() => handleDateChange(date)}
                    className={`p-3 rounded-lg text-center text-sm transition-all ${
                      isSunday
                        ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                        : selectedDate === date
                        ? "bg-gold-600 text-white"
                        : "bg-white border border-gray-200 hover:border-gold-400"
                    }`}
                  >
                    <span className="block text-xs capitalize">{dayName}</span>
                    <span className="block text-lg font-medium">{dayNum}</span>
                    <span className="block text-xs capitalize">{month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Heure
              </label>
              {loadingSlots ? (
                <p className="text-gray-400 text-sm py-4">Chargement des créneaux...</p>
              ) : availableSlots.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">
                  Aucun créneau disponible pour cette date. Essayez un autre jour.
                </p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === slot
                          ? "bg-gold-600 text-white"
                          : "bg-white border border-gray-200 hover:border-gold-400"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1">
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
          <h2 className="text-xl font-medium mb-6">Vos informations</h2>

          {/* Summary */}
          <div className="bg-cream-100 rounded-lg p-4 mb-6 text-sm space-y-1">
            <p><strong>Prestation :</strong> {selectedService?.name} — {selectedService?.price.toFixed(0)} &euro;</p>
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
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="booking-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="booking-lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="booking-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="booking-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="booking-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="booking-notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes / Préférences
              </label>
              <textarea
                id="booking-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Ex: allergies, préférences particulières..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button onClick={goPrev} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !formData.firstName || !formData.lastName || !formData.email}
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Réservation en cours..." : "Confirmer le rendez-vous"}
              {!submitting && <Check className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {currentStep === "confirmation" && confirmed && (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Rendez-vous confirmé !</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Votre rendez-vous a bien été enregistré. Un email de confirmation a été envoyé à{" "}
            <strong>{formData.email}</strong>.
          </p>
          <div className="bg-cream-100 rounded-lg p-6 max-w-sm mx-auto text-sm text-left space-y-2">
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
            <p><strong>Prix :</strong> {selectedService?.price.toFixed(0)} &euro;</p>
          </div>
        </div>
      )}
    </div>
  );
}
