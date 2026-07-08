import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

export async function GET() {
  try {
    const categories = await prisma.projectCategory.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const body = await request.json();

    const category = await prisma.projectCategory.create({
      data: {
        name: body.name,
        slug: body.slug,
        badgeLabel: body.badgeLabel || null,
        description: body.description || null,
        sortOrder: Number(body.sortOrder || 0),
        isActive: Boolean(body.isActive ?? true),
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project category" },
      { status: 500 },
    );
  }
}
