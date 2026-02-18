import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const staff = await prisma.staffMember.findMany({
    where: { active: true },
    orderBy: { firstName: "asc" },
  });
  return NextResponse.json(staff);
}
