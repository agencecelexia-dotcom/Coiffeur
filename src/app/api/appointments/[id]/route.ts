import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { status } = body;

  const validStatuses = ["confirmed", "cancelled", "completed", "no_show"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const appointment = await prisma.appointment.update({
    where: { id: params.id },
    data: { status },
    include: { service: true, staff: true, client: true },
  });

  return NextResponse.json(appointment);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { service: true, staff: true, client: true },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json(appointment);
}
