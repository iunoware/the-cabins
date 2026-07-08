import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";
import { deleteProjectImageFiles } from "../../projects/_utils";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;
    const body = await request.json();

    const category = await prisma.projectCategory.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        badgeLabel: body.badgeLabel || null,
        description: body.description || null,
        sortOrder: Number(body.sortOrder || 0),
        isActive: Boolean(body.isActive),
      },
    });

    return NextResponse.json({ category });
  } catch {
    return NextResponse.json(
      { error: "Failed to update project category" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;

    const category = await prisma.projectCategory.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const imageUrls = category.projects.flatMap((project) =>
      project.images.map((image) => image.imageUrl),
    );

    await deleteProjectImageFiles(imageUrls);

    await prisma.projectCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project category" },
      { status: 500 },
    );
  }
}
