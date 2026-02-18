import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { active: true },
        orderBy: { price: "asc" },
      },
    },
  });
  return NextResponse.json(categories);
}
