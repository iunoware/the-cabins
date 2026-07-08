import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        testimonials: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
