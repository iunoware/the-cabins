/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        testimonials: {
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

export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || null,
        categoryId: body.categoryId,
        city: body.city || null,
        country: body.country || null,
        status: body.status || null,
        isFeatured: Boolean(body.isFeatured),
        isActive: Boolean(body.isActive ?? true),
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

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
