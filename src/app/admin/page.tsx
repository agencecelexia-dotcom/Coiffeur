import { staff } from "@/lib/data";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light">Administration</h1>
        <p className="text-gray-500 mt-1">Tableau de bord et gestion de l&apos;agenda</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wider">RDV aujourd&apos;hui</p>
          <p className="text-3xl font-light mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wider">Total clients</p>
          <p className="text-3xl font-light mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wider">RDV à venir</p>
          <p className="text-3xl font-light mt-2">0</p>
        </div>
      </div>

      <AdminDashboard
        staff={staff}
        initialAppointments={[]}
        initialDate={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}
