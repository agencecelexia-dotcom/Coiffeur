"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
}

interface AdminDashboardProps {
  staff: StaffMember[];
  initialAppointments: never[];
  initialDate: string;
}

export function AdminDashboard({ staff, initialDate }: AdminDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [filterStaffId, setFilterStaffId] = useState<string>("");

  const changeDate = (offset: number) => {
    const d = new Date(selectedDate + "T12:00:00");
    d.setDate(d.getDate() + offset);
    const newDate = d.toISOString().split("T")[0];
    setSelectedDate(newDate);
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
            onChange={(e) => setFilterStaffId(e.target.value)}
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
        <div className="divide-y divide-gray-50">
          {hours.map((hour) => (
            <div key={hour} className="flex min-h-[60px]">
              <div className="w-20 flex-shrink-0 py-3 px-4 text-sm text-gray-400 border-r border-gray-50 text-right">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div className="flex-1 p-2 flex flex-wrap gap-2">
                <div className="text-xs text-gray-200 py-2">—</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder message */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>L&apos;agenda sera connecté à la base de données dans une prochaine version.</p>
      </div>
    </div>
  );
}
