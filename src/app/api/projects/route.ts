import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
