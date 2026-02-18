import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const staffId = searchParams.get("staffId");
  const date = searchParams.get("date"); // YYYY-MM-DD
  const duration = parseInt(searchParams.get("duration") || "30");

  if (!staffId || !date) {
    return NextResponse.json({ error: "staffId and date are required" }, { status: 400 });
  }

  const dateObj = new Date(date + "T00:00:00");
  const dayOfWeek = dateObj.getDay();

  // Get staff schedule for this day
  const schedule = await prisma.staffSchedule.findUnique({
    where: { staffId_dayOfWeek: { staffId, dayOfWeek } },
  });

  if (!schedule || schedule.isOff) {
    return NextResponse.json({ slots: [] });
  }

  // Get existing appointments for this staff on this date
  const startOfDay = new Date(date + "T00:00:00");
  const endOfDay = new Date(date + "T23:59:59");

  const appointments = await prisma.appointment.findMany({
    where: {
      staffId,
      dateTime: { gte: startOfDay, lte: endOfDay },
      status: { in: ["confirmed", "completed"] },
    },
    orderBy: { dateTime: "asc" },
  });

  // Generate available slots
  const [startH, startM] = schedule.startTime.split(":").map(Number);
  const [endH, endM] = schedule.endTime.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const slots: string[] = [];

  for (let time = startMinutes; time + duration <= endMinutes; time += 30) {
    const slotStart = new Date(date + "T00:00:00");
    slotStart.setHours(Math.floor(time / 60), time % 60, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + duration);

    // Check for conflicts with existing appointments
    const hasConflict = appointments.some((apt) => {
      const aptEnd = new Date(apt.dateTime);
      aptEnd.setMinutes(aptEnd.getMinutes() + apt.duration);
      return slotStart < aptEnd && slotEnd > apt.dateTime;
    });

    if (!hasConflict) {
      const hours = Math.floor(time / 60).toString().padStart(2, "0");
      const mins = (time % 60).toString().padStart(2, "0");
      slots.push(`${hours}:${mins}`);
    }
  }

  return NextResponse.json({ slots });
}
