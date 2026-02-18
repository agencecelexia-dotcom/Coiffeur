"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, User, X } from "lucide-react";

interface Appointment {
  id: string;
  dateTime: string;
  duration: number;
  status: string;
  notes: string;
  service: { name: string; price: number };
  staff: { firstName: string; lastName: string };
  client: { firstName: string; lastName: string; email: string; phone: string };
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
}

interface AdminDashboardProps {
  staff: StaffMember[];
  initialAppointments: Appointment[];
  initialDate: string;
}

export function AdminDashboard({ staff, initialAppointments, initialDate }: AdminDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [filterStaffId, setFilterStaffId] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [loading, setLoading] = useState(false);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const fetchAppointments = async (date: string, staffId: string) => {
    setLoading(true);
    try {
      let url = `/api/appointments?date=${date}`;
      if (staffId) url += `&staffId=${staffId}`;
      const res = await fetch(url);
      const data = await res.json();
      setAppointments(data);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const changeDate = (offset: number) => {
    const d = new Date(selectedDate + "T12:00:00");
    d.setDate(d.getDate() + offset);
    const newDate = d.toISOString().split("T")[0];
    setSelectedDate(newDate);
    fetchAppointments(newDate, filterStaffId);
  };

  const handleStaffFilter = (staffId: string) => {
    setFilterStaffId(staffId);
    fetchAppointments(selectedDate, staffId);
  };

  const updateStatus = async (aptId: string, newStatus: string) => {
    try {
      await fetch(`/api/appointments/${aptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchAppointments(selectedDate, filterStaffId);
      setSelectedApt(null);
    } catch {
      // silent fail
    }
  };

  const hours = Array.from({ length: 11 }, (_, i) => i + 9); // 9:00 - 19:00

  const displayDate = new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold-600" />
            <span className="font-medium capitalize">{displayDate}</span>
          </div>
          <button
            onClick={() => changeDate(1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <select
            value={filterStaffId}
            onChange={(e) => handleStaffFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold-400 outline-none"
          >
            <option value="">Tous les coiffeurs</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {hours.map((hour) => {
              const hourApps = appointments.filter((a) => {
                const h = new Date(a.dateTime).getHours();
                return h === hour;
              });

              return (
                <div key={hour} className="flex min-h-[60px]">
                  <div className="w-20 flex-shrink-0 py-3 px-4 text-sm text-gray-400 border-r border-gray-50 text-right">
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                  <div className="flex-1 p-2 flex flex-wrap gap-2">
                    {hourApps.map((apt) => {
                      const time = new Date(apt.dateTime).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const statusColors: Record<string, string> = {
                        confirmed: "bg-blue-50 border-blue-200 text-blue-800",
                        completed: "bg-green-50 border-green-200 text-green-800",
                        cancelled: "bg-red-50 border-red-200 text-red-800",
                        no_show: "bg-gray-100 border-gray-300 text-gray-600",
                      };
                      return (
                        <button
                          key={apt.id}
                          onClick={() => setSelectedApt(apt)}
                          className={`text-left px-3 py-2 rounded-lg border text-xs transition-all hover:shadow ${
                            statusColors[apt.status] || statusColors.confirmed
                          }`}
                        >
                          <p className="font-medium">
                            {time} — {apt.client.firstName} {apt.client.lastName}
                          </p>
                          <p className="opacity-70">
                            {apt.service.name} • {apt.staff.firstName}
                          </p>
                        </button>
                      );
                    })}
                    {hourApps.length === 0 && (
                      <div className="text-xs text-gray-200 py-2">—</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Appointment detail modal */}
      {selectedApt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Détails du rendez-vous</h3>
              <button
                onClick={() => setSelectedApt(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>
                  <strong>{selectedApt.client.firstName} {selectedApt.client.lastName}</strong>
                </span>
              </div>
              <p className="text-gray-500 pl-6">{selectedApt.client.email}</p>
              {selectedApt.client.phone && (
                <p className="text-gray-500 pl-6">{selectedApt.client.phone}</p>
              )}
              <hr />
              <p><strong>Service :</strong> {selectedApt.service.name} — {selectedApt.service.price.toFixed(0)} &euro;</p>
              <p><strong>Coiffeur :</strong> {selectedApt.staff.firstName} {selectedApt.staff.lastName}</p>
              <p className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                {new Date(selectedApt.dateTime).toLocaleString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })} ({selectedApt.duration} min)
              </p>
              {selectedApt.notes && (
                <p className="text-gray-500"><strong>Notes :</strong> {selectedApt.notes}</p>
              )}
              <hr />
              <p>
                <strong>Statut :</strong>{" "}
                <span className="capitalize">{selectedApt.status.replace("_", " ")}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedApt.status === "confirmed" && (
                <>
                  <button
                    onClick={() => updateStatus(selectedApt.id, "completed")}
                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700"
                  >
                    Terminé
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApt.id, "no_show")}
                    className="text-xs bg-gray-600 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700"
                  >
                    Absent
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApt.id, "cancelled")}
                    className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700"
                  >
                    Annuler
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
