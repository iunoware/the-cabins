import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function authErrorResponse(error: unknown) {
  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// GET single product variant with nested child arrays
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const variant = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        family: {
          select: {
            id: true,
            name: true,
            slug: true,
            categoryId: true,
            category: {
              select: { id: true, name: true, slug: true }
            }
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
      originalPrice: variant.originalPrice ? Number(variant.originalPrice) : null,
      discountedPrice: variant.discountedPrice ? Number(variant.discountedPrice) : null,
      currency: variant.currency,
      dimensions: variant.dimensions || "",
      capacity: variant.capacity || "",
      material: variant.material || "",
      warranty: variant.warranty || "",
      brochure: variant.brochure || "",
      model3d: variant.model3d || "",
      ctaText: variant.ctaText || "Enquire on WhatsApp",
      whatsappNumber: variant.whatsappNumber || "",
      metaTitle: variant.metaTitle || "",
      metaDescription: variant.metaDescription || "",
      keywords: variant.keywords || "",
      ogImage: variant.ogImage || "",
      thumbnail: variant.thumbnail,
      featured: variant.featured,
      active: variant.active,
      sortOrder: variant.sortOrder,
      updatedAt: variant.updatedAt.toISOString(),
      images: variant.images,
      features: variant.features,
      specifications: variant.specifications,
      applications: variant.applications,
      faqs: variant.faqs
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("GET /api/admin/product-variants/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// PATCH/PUT update product variant with nested child arrays
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const body = await request.json();
    const {
      familyId,
      name,
      shortDescription,
      description,
      price,
      originalPrice,
      discountedPrice,
      currency,
      dimensions,
      capacity,
      material,
      warranty,
      thumbnail,
      brochure,
      model3d,
      featured,
      active,
      sortOrder,
      ctaText,
      whatsappNumber,
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
      images,
      features,
      specifications,
      applications,
      faqs
    } = body;

    const variant = await prisma.productVariant.findUnique({
      where: { id }
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Product variant not found." },
        { status: 404 }
      );
    }

    if (familyId && familyId !== variant.familyId) {
      const family = await prisma.productFamily.findUnique({
        where: { id: familyId }
      });
      if (!family) {
        return NextResponse.json(
          { error: "Parent product family not found." },
          { status: 400 }
        );
      }
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name || variant.name);

    if (slug !== variant.slug) {
      const existing = await prisma.productVariant.findUnique({
        where: { slug }
      });
      if (existing) {
        return NextResponse.json(
          { error: "Product variant with this slug already exists." },
          { status: 409 }
        );
      }
    }

    // Calculate price updates if originalPrice or discountedPrice are sent in the body
    let finalPrice: number | null | undefined = undefined;
    let orig: number | null | undefined = undefined;
    let disc: number | null | undefined = undefined;

    if (originalPrice !== undefined || discountedPrice !== undefined) {
      const currentOriginal = originalPrice !== undefined ? originalPrice : (variant.originalPrice ? Number(variant.originalPrice) : null);
      const currentDiscounted = discountedPrice !== undefined ? discountedPrice : (variant.discountedPrice ? Number(variant.discountedPrice) : null);

      orig = currentOriginal !== null && currentOriginal !== "" ? Number(currentOriginal) : null;
      disc = currentDiscounted !== null && currentDiscounted !== "" ? Number(currentDiscounted) : null;
      finalPrice = disc !== null ? disc : (orig !== null ? orig : null);
    } else if (price !== undefined) {
      if (price === null || price === "") {
        finalPrice = null;
      } else {
        const parsedPrice = Number(price);
        if (!isNaN(parsedPrice)) {
          finalPrice = parsedPrice;
        }
      }
    }

    // Run transaction
    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.productVariant.update({
        where: { id },
        data: {
          family: familyId !== undefined ? { connect: { id: familyId } } : undefined,
          name: name !== undefined ? name.trim() : undefined,
          slug,
          shortDescription: shortDescription !== undefined ? shortDescription.trim() : undefined,
          description: description !== undefined ? description.trim() : undefined,
          price: finalPrice !== undefined ? finalPrice : undefined,
          originalPrice: orig !== undefined ? orig : undefined,
          discountedPrice: disc !== undefined ? disc : undefined,
          currency: currency !== undefined ? currency : undefined,
          dimensions: dimensions !== undefined ? dimensions : undefined,
          capacity: capacity !== undefined ? capacity : undefined,
          material: material !== undefined ? material : undefined,
          warranty: warranty !== undefined ? warranty : undefined,
          thumbnail: thumbnail !== undefined ? thumbnail : undefined,
          brochure: brochure !== undefined ? brochure : undefined,
          model3d: model3d !== undefined ? model3d : undefined,
          ctaText: ctaText !== undefined ? ctaText : undefined,
          whatsappNumber: whatsappNumber !== undefined ? whatsappNumber : undefined,
          metaTitle: metaTitle !== undefined ? metaTitle : undefined,
          metaDescription: metaDescription !== undefined ? metaDescription : undefined,
          keywords: keywords !== undefined ? keywords : undefined,
          ogImage: ogImage !== undefined ? ogImage : undefined,
          featured: featured !== undefined ? !!featured : undefined,
          active: active !== undefined ? !!active : undefined,
          sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : undefined
        }
      });

      // Sync nested arrays (wipe and replace)
      if (images !== undefined) {
        await tx.productImage.deleteMany({ where: { variantId: id } });
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((img: any, idx: number) => ({
              variantId: id,
              imageUrl: img.imageUrl || img,
              altText: img.altText || "",
              sortOrder: img.sortOrder !== undefined ? parseInt(img.sortOrder, 10) : idx
            }))
          });
        }
      }

      if (features !== undefined) {
        await tx.productFeature.deleteMany({ where: { variantId: id } });
        if (features.length > 0) {
          await tx.productFeature.createMany({
            data: features.map((f: any, idx: number) => ({
              variantId: id,
              title: f.title,
              description: f.description || "",
              icon: f.icon || "",
              sortOrder: f.sortOrder !== undefined ? parseInt(f.sortOrder, 10) : idx
            }))
          });
        }
      }

      if (specifications !== undefined) {
        await tx.productSpecification.deleteMany({ where: { variantId: id } });
        if (specifications.length > 0) {
          await tx.productSpecification.createMany({
            data: specifications.map((s: any, idx: number) => ({
              variantId: id,
              parameter: s.parameter || s.label,
              value: s.value,
              sortOrder: s.sortOrder !== undefined ? parseInt(s.sortOrder, 10) : idx
            }))
          });
        }
      }

      if (applications !== undefined) {
        await tx.productApplication.deleteMany({ where: { variantId: id } });
        if (applications.length > 0) {
          await tx.productApplication.createMany({
            data: applications.map((a: any, idx: number) => ({
              variantId: id,
              title: a.title,
              icon: a.icon || "",
              sortOrder: a.sortOrder !== undefined ? parseInt(a.sortOrder, 10) : idx
            }))
          });
        }
      }

      if (faqs !== undefined) {
        await tx.productFAQ.deleteMany({ where: { variantId: id } });
        if (faqs.length > 0) {
          await tx.productFAQ.createMany({
            data: faqs.map((f: any, idx: number) => ({
              variantId: id,
              question: f.question,
              answer: f.answer,
              sortOrder: f.sortOrder !== undefined ? parseInt(f.sortOrder, 10) : idx
            }))
          });
        }
      }

      return updated;
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("PATCH /api/admin/product-variants/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// Support PUT as fallback
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return PATCH(request, context);
}

// DELETE product variant
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const variant = await prisma.productVariant.findUnique({
      where: { id }
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Product variant not found." },
        { status: 404 }
      );
    }

    // Cascade deletes child tables via database triggers (onDelete: Cascade)
    await prisma.productVariant.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("DELETE /api/admin/product-variants/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}
