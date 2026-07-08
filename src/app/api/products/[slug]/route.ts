import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET full variant details with related variants by variant slug (Public)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const variant = await prisma.productVariant.findUnique({
      where: { slug, active: true },
      include: {
        family: {
          include: {
            category: true
          }
        },
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        specifications: { orderBy: { sortOrder: "asc" } },
        applications: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } }
      }
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Product variant not found." },
        { status: 404 }
      );
    }

    // Retrieve related products in same family (excluding current)
    let relatedVariants = await prisma.productVariant.findMany({
      where: {
        familyId: variant.familyId,
        active: true,
        id: { not: variant.id }
      },
      take: 3,
      orderBy: { sortOrder: "asc" },
      include: {
        family: {
          select: { name: true, slug: true }
        }
      }
    });

    // Fallback: if fewer than 3 related variants, pull variants under the same category
    if (relatedVariants.length < 3) {
      const excludedIds = [variant.id, ...relatedVariants.map((rv) => rv.id)];
      const categoryFallback = await prisma.productVariant.findMany({
        where: {
          family: {
            categoryId: variant.family.categoryId
          },
          active: true,
          id: { notIn: excludedIds }
        },
        take: 3 - relatedVariants.length,
        orderBy: { sortOrder: "asc" },
        include: {
          family: {
            select: { name: true, slug: true }
          }
        }
      });

      relatedVariants = [...relatedVariants, ...categoryFallback];
    }

    // Map related products format
    const related = relatedVariants.map((rv) => ({
      id: rv.id,
      name: rv.name,
      slug: rv.slug,
      familyName: rv.family.name,
      familySlug: rv.family.slug,
      thumbnail: rv.thumbnail,
      shortDescription: rv.shortDescription,
      price: rv.price ? Number(rv.price) : null,
      currency: rv.currency
    }));

    return NextResponse.json({
      id: variant.id,
      familyId: variant.familyId,
      familyName: variant.family.name,
      familySlug: variant.family.slug,
      categoryId: variant.family.categoryId,
      categoryName: variant.family.category.name,
      categorySlug: variant.family.category.slug,
      name: variant.name,
      slug: variant.slug,
      shortDescription: variant.shortDescription,
      description: variant.description,
      price: variant.price ? Number(variant.price) : null,
      currency: variant.currency,
      dimensions: variant.dimensions || "",
      capacity: variant.capacity || "",
      material: variant.material || "",
      warranty: variant.warranty || "",
      brochure: variant.brochure || "",
      model3d: variant.model3d || "",
      thumbnail: variant.thumbnail,
      featured: variant.featured,
      active: variant.active,
      sortOrder: variant.sortOrder,
      updatedAt: variant.updatedAt.toISOString(),
      images: variant.images,
      features: variant.features,
      specifications: variant.specifications,
      applications: variant.applications,
      faqs: variant.faqs,
      related
    });
  } catch (error: unknown) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
