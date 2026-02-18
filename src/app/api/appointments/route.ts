import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { serviceId, staffId, date, time, firstName, lastName, email, phone, notes } = body;

  if (!serviceId || !staffId || !date || !time || !firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const staff = await prisma.staffMember.findUnique({ where: { id: staffId } });
  if (!staff) {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
  }

  const dateTime = new Date(`${date}T${time}:00`);

  // Check if slot is still available
  const slotEnd = new Date(dateTime);
  slotEnd.setMinutes(slotEnd.getMinutes() + service.duration);

  const conflict = await prisma.appointment.findFirst({
    where: {
      staffId,
      status: { in: ["confirmed", "completed"] },
      dateTime: { lt: slotEnd },
      AND: {
        dateTime: { gte: new Date(`${date}T00:00:00`) },
      },
    },
  });

  if (conflict) {
    const conflictEnd = new Date(conflict.dateTime);
    conflictEnd.setMinutes(conflictEnd.getMinutes() + conflict.duration);
    if (dateTime < conflictEnd && slotEnd > conflict.dateTime) {
      return NextResponse.json({ error: "Ce créneau n'est plus disponible" }, { status: 409 });
    }
  }

  // Find or create client
  let client = await prisma.client.findUnique({ where: { email } });
  if (!client) {
    client = await prisma.client.create({
      data: { firstName, lastName, email, phone: phone || "", notes: notes || "" },
    });
  }

  // Create appointment
  const appointment = await prisma.appointment.create({
    data: {
      clientId: client.id,
      serviceId: service.id,
      staffId: staff.id,
      dateTime,
      duration: service.duration,
      notes: notes || "",
    },
    include: { service: true, staff: true, client: true },
  });

  // Send confirmation email (non-blocking)
  const salon = await prisma.salonInfo.findUnique({ where: { id: "singleton" } });
  sendConfirmationEmail({
    clientName: `${client.firstName} ${client.lastName}`,
    clientEmail: client.email,
    serviceName: service.name,
    staffName: `${staff.firstName} ${staff.lastName}`,
    dateTime: dateTime.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    duration: service.duration,
    salonName: salon?.name || "Salon Élégance",
    salonAddress: salon ? `${salon.address}, ${salon.postalCode} ${salon.city}` : "",
    salonPhone: salon?.phone || "",
  }).catch(console.error);

  return NextResponse.json(appointment, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const staffId = searchParams.get("staffId");

  const where: Record<string, unknown> = {};
  if (date) {
    const startOfDay = new Date(date + "T00:00:00");
    const endOfDay = new Date(date + "T23:59:59");
    where.dateTime = { gte: startOfDay, lte: endOfDay };
  }
  if (staffId) {
    where.staffId = staffId;
  }

  const appointments = await prisma.appointment.findMany({
    where,
    include: { service: true, staff: true, client: true },
    orderBy: { dateTime: "asc" },
  });

  return NextResponse.json(appointments);
}
