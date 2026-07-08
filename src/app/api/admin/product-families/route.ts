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

// GET all product families
export async function GET(request: Request) {
  try {
    await getRequiredCurrentUser();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || "";
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const featured = searchParams.get("featured") || "";
    const popular = searchParams.get("popular") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = searchParams.get("page") || "";
    const limit = searchParams.get("limit") || "";

    // Build filters
    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } }
      ];
    }

    if (status === "active") {
      where.active = true;
    } else if (status === "draft") {
      where.active = false;
    }

    if (featured === "true") {
      where.featured = true;
    } else if (featured === "false") {
      where.featured = false;
    }

    if (popular === "true") {
      where.popular = true;
    } else if (popular === "false") {
      where.popular = false;
    }

    // Build sorting
    let orderBy: any = { sortOrder: "asc" };
    if (sort === "newest") {
      orderBy = { updatedAt: "desc" };
    } else if (sort === "oldest") {
      orderBy = { updatedAt: "asc" };
    } if (sort === "name-asc") {
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

    // Query families with counts
    const dbFamilies = await prisma.productFamily.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        _count: {
          select: { variants: true }
        }
      }
    });

    // Map response structure
    const families = dbFamilies.map((fam) => ({
      id: fam.id,
      categoryId: fam.categoryId,
      name: fam.name,
      slug: fam.slug,
      shortDescription: fam.shortDescription,
      thumbnail: fam.thumbnail,
      active: fam.active,
      featured: fam.featured,
      popular: fam.popular,
      sortOrder: fam.sortOrder,
      updatedAt: fam.updatedAt.toISOString(),
      productsCount: fam._count.variants,
      categoryName: fam.category.name,
      categorySlug: fam.category.slug
    }));

    return NextResponse.json(families);
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("GET /api/admin/product-families error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// POST create product family
export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const body = await request.json();
    const { categoryId, name, shortDescription, thumbnail, featured, popular, active, sortOrder } = body;

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required." },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Family name is required." },
        { status: 400 }
      );
    }

    // Validate Category exists
    const category = await prisma.productCategory.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Parent category not found." },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    // Check unique slug
    const existing = await prisma.productFamily.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Product family with this slug already exists." },
        { status: 409 }
      );
    }

    const family = await prisma.productFamily.create({
      data: {
        categoryId,
        name: name.trim(),
        slug,
        shortDescription: shortDescription?.trim() || "",
        thumbnail: thumbnail || "/images/security-cabin.png",
        featured: featured !== undefined ? !!featured : false,
        popular: popular !== undefined ? !!popular : false,
        active: active !== undefined ? !!active : true,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : 0
      },
      include: {
        category: {
          select: { name: true, slug: true }
        }
      }
    });

    return NextResponse.json({
      id: family.id,
      categoryId: family.categoryId,
      name: family.name,
      slug: family.slug,
      shortDescription: family.shortDescription,
      thumbnail: family.thumbnail,
      active: family.active,
      featured: family.featured,
      popular: family.popular,
      sortOrder: family.sortOrder,
      updatedAt: family.updatedAt.toISOString(),
      productsCount: 0,
      categoryName: family.category.name,
      categorySlug: family.category.slug
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("POST /api/admin/product-families error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}
