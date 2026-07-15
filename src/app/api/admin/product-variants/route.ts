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

// GET all product variants
export async function GET(request: Request) {
  try {
    await getRequiredCurrentUser();

    const { searchParams } = new URL(request.url);
    const familyId = searchParams.get("familyId") || "";
    const search = searchParams.get("search") || "";
    const active = searchParams.get("active") || "";
    const featured = searchParams.get("featured") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = searchParams.get("page") || "";
    const limit = searchParams.get("limit") || "";

    // Build filters
    const where: any = {};

    if (familyId) {
      where.familyId = familyId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    if (active === "true") {
      where.active = true;
    } else if (active === "false") {
      where.active = false;
    }

    if (featured === "true") {
      where.featured = true;
    } else if (featured === "false") {
      where.featured = false;
    }

    // Build sorting
    let orderBy: any = { sortOrder: "asc" };
    if (sort === "newest") {
      orderBy = { updatedAt: "desc" };
    } else if (sort === "oldest") {
      orderBy = { updatedAt: "asc" };
    } else if (sort === "name-asc") {
      orderBy = { name: "asc" };
    } else if (sort === "name-desc") {
      orderBy = { name: "desc" };
    }

    // Pagination
    let skip = undefined;
    let take = undefined;
    if (page && limit) {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      skip = (pageNum - 1) * limitNum;
      take = limitNum;
    }

    // Query product variants with child relations included
    const dbVariants = await prisma.productVariant.findMany({
      where,
      orderBy,
      skip,
      take,
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
        specifications: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        applications: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } }
      }
    });

    // Map formatted values including nested arrays
    const variants = dbVariants.map((v) => ({
      id: v.id,
      familyId: v.familyId,
      familyName: v.family.name,
      familySlug: v.family.slug,
      categoryId: v.family.categoryId,
      categoryName: v.family.category.name,
      categorySlug: v.family.category.slug,
      name: v.name,
      slug: v.slug,
      shortDescription: v.shortDescription,
      description: v.description,
      price: v.price ? Number(v.price) : null,
      originalPrice: v.originalPrice ? Number(v.originalPrice) : null,
      discountedPrice: v.discountedPrice ? Number(v.discountedPrice) : null,
      currency: v.currency,
      dimensions: v.dimensions || "",
      capacity: v.capacity || "",
      material: v.material || "",
      warranty: v.warranty || "",
      brochure: v.brochure || "",
      model3d: v.model3d || "",
      ctaText: v.ctaText || "Enquire on WhatsApp",
      whatsappNumber: v.whatsappNumber || "",
      metaTitle: v.metaTitle || "",
      metaDescription: v.metaDescription || "",
      keywords: v.keywords || "",
      ogImage: v.ogImage || "",
      attributes: (v.attributes as any) || [],
      thumbnail: v.thumbnail,
      featured: v.featured,
      active: v.active,
      sortOrder: v.sortOrder,
      updatedAt: v.updatedAt.toISOString(),
      images: v.images.map((img) => img.imageUrl),
      specifications: v.specifications.map((s) => ({ parameter: s.parameter, value: s.value })),
      features: v.features.map((f) => ({ title: f.title, description: f.description, icon: f.icon })),
      applications: v.applications.map((a) => ({ title: a.title, icon: a.icon })),
      faqs: v.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
    }));

    return NextResponse.json(variants);
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("GET /api/admin/product-variants error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// POST create product variant with child tables
export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

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
      attributes = [],
      images = [],
      features = [],
      specifications = [],
      applications = [],
      faqs = []
    } = body;

    if (!familyId) {
      return NextResponse.json(
        { error: "Family ID is required." },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Variant name is required." },
        { status: 400 }
      );
    }

    // Verify parent family exists
    const family = await prisma.productFamily.findUnique({
      where: { id: familyId }
    });

    if (!family) {
      return NextResponse.json(
        { error: "Parent product family not found." },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    // Verify slug uniqueness
    const existing = await prisma.productVariant.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Product variant with this slug already exists." },
        { status: 409 }
      );
    }

    const orig = originalPrice !== undefined && originalPrice !== null && originalPrice !== "" ? Number(originalPrice) : null;
    const disc = discountedPrice !== undefined && discountedPrice !== null && discountedPrice !== "" ? Number(discountedPrice) : null;
    let finalPrice = disc !== null ? disc : (orig !== null ? orig : null);
    if (finalPrice === null && price !== undefined && price !== null && price !== "") {
      const parsedPrice = Number(price);
      if (!isNaN(parsedPrice)) {
        finalPrice = parsedPrice;
      }
    }

    // Create everything in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.create({
        data: {
          familyId,
          name: name.trim(),
          slug,
          shortDescription: shortDescription?.trim() || "",
          description: description?.trim() || "",
          price: finalPrice,
          originalPrice: orig,
          discountedPrice: disc,
          currency: currency || "AED",
          dimensions: dimensions || "",
          capacity: capacity || "",
          material: material || "",
          warranty: warranty || "",
          brochure: brochure || "",
          model3d: model3d || "",
          ctaText: ctaText || "Enquire on WhatsApp",
          whatsappNumber: whatsappNumber || "",
          metaTitle: metaTitle || `${name} | The Cabins`,
          metaDescription: metaDescription || shortDescription || "",
          keywords: keywords || "",
          ogImage: ogImage || thumbnail || "/images/security-cabin.png",
          attributes: attributes || [],
          thumbnail: thumbnail || "/images/security-cabin.png",
          featured: featured !== undefined ? !!featured : false,
          active: active !== undefined ? !!active : true,
          sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : 0
        }
      });

      // Child tables creations
      if (images.length > 0) {
        await tx.productImage.createMany({
          data: images.map((img: any, idx: number) => ({
            variantId: variant.id,
            imageUrl: img.imageUrl || img,
            altText: img.altText || "",
            sortOrder: img.sortOrder !== undefined ? parseInt(img.sortOrder, 10) : idx
          }))
        });
      }

      if (features.length > 0) {
        await tx.productFeature.createMany({
          data: features.map((f: any, idx: number) => ({
            variantId: variant.id,
            title: f.title,
            description: f.description || "",
            icon: f.icon || "",
            sortOrder: f.sortOrder !== undefined ? parseInt(f.sortOrder, 10) : idx
          }))
        });
      }

      if (specifications.length > 0) {
        await tx.productSpecification.createMany({
          data: specifications.map((s: any, idx: number) => ({
            variantId: variant.id,
            parameter: s.parameter || s.label,
            value: s.value,
            sortOrder: s.sortOrder !== undefined ? parseInt(s.sortOrder, 10) : idx
          }))
        });
      }

      if (applications.length > 0) {
        await tx.productApplication.createMany({
          data: applications.map((a: any, idx: number) => ({
            variantId: variant.id,
            title: a.title,
            icon: a.icon || "",
            sortOrder: a.sortOrder !== undefined ? parseInt(a.sortOrder, 10) : idx
          }))
        });
      }

      if (faqs.length > 0) {
        await tx.productFAQ.createMany({
          data: faqs.map((f: any, idx: number) => ({
            variantId: variant.id,
            question: f.question,
            answer: f.answer,
            sortOrder: f.sortOrder !== undefined ? parseInt(f.sortOrder, 10) : idx
          }))
        });
      }

      return variant;
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("POST /api/admin/product-variants error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}
