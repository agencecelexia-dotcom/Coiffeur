import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminPage() {
  const staff = await prisma.staffMember.findMany({
    where: { active: true },
    orderBy: { firstName: "asc" },
  });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todayAppointments = await prisma.appointment.findMany({
    where: {
      dateTime: { gte: todayStart, lte: todayEnd },
    },
    include: { service: true, staff: true, client: true },
    orderBy: { dateTime: "asc" },
  });

  const totalClients = await prisma.client.count();
  const totalAppointments = await prisma.appointment.count({
    where: { status: "confirmed" },
  });

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
          <p className="text-3xl font-light mt-2">{todayAppointments.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wider">Total clients</p>
          <p className="text-3xl font-light mt-2">{totalClients}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wider">RDV à venir</p>
          <p className="text-3xl font-light mt-2">{totalAppointments}</p>
        </div>
      </div>

      <AdminDashboard
        staff={staff}
        initialAppointments={todayAppointments.map((a) => ({
          ...a,
          dateTime: a.dateTime.toISOString(),
          createdAt: a.createdAt.toISOString(),
          client: { ...a.client, createdAt: a.client.createdAt.toISOString() },
        }))}
        initialDate={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}
