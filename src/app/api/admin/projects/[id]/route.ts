/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        testimonials: {
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

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;
    const body = await request.json();

    await prisma.projectImage.deleteMany({
      where: { projectId: id },
    });

    await prisma.projectTestimonial.deleteMany({
      where: { projectId: id },
    });

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || null,
        categoryId: body.categoryId,
        city: body.city || null,
        country: body.country || null,
        status: body.status || null,
        isFeatured: Boolean(body.isFeatured),
        isActive: Boolean(body.isActive),
        sortOrder: Number(body.sortOrder || 0),
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,

        images: {
          create: body.images.map((image: any, index: number) => ({
            imageUrl: image.imageUrl,
            altText: image.altText || null,
            isCover: index === 0,
            sortOrder: index,
          })),
        },

        testimonials: body.testimonial?.clientName
          ? {
              create: {
                clientName: body.testimonial.clientName,
                designation: body.testimonial.designation || null,
                companyName: body.testimonial.companyName || null,
                testimonial: body.testimonial.testimonial,
                rating: Number(body.testimonial.rating || 5),
                isActive: true,
                sortOrder: 0,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
