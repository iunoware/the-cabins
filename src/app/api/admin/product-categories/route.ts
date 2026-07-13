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

// GET all categories
export async function GET(request: Request) {
  try {
    await getRequiredCurrentUser();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "newest";

    // Build filters
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status === "active") {
      where.active = true;
    } else if (status === "draft") {
      where.active = false;
    }

    // Build sorting
    let orderBy: any = { updatedAt: "desc" };
    if (sortBy === "name-asc") {
      orderBy = { name: "asc" };
    } else if (sortBy === "name-desc") {
      orderBy = { name: "desc" };
    } else if (sortBy === "oldest") {
      orderBy = { updatedAt: "asc" };
    }

    // Query categories with counts
    const dbCategories = await prisma.productCategory.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { families: true },
        },
        families: {
          select: {
            _count: {
              select: { variants: true },
            },
          },
        },
      },
    });

    // Map counts
    const categories = dbCategories.map((cat) => {
      const familiesCount = cat._count.families;
      const productsCount = cat.families.reduce(
        (sum, fam) => sum + fam._count.variants,
        0,
      );

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        image: cat.image || "",
        active: cat.active,
        featured: cat.featured,
        badge: cat.badge || "",
        updatedAt: cat.updatedAt.toISOString(),
        familiesCount,
        productsCount,
      };
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `${error.message}\n${error.stack}`
            : String(error),
      },
      { status: 500 },
    );
  }
}

// POST create category
export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const body = await request.json();
    const { name, description, image, active, featured, badge } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required." },
        { status: 400 },
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    // Check slug duplicate
    const existing = await prisma.productCategory.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Category with this slug already exists." },
        { status: 409 },
      );
    }

    const category = await prisma.productCategory.create({
      data: {
        name: name.trim(),
        slug,
        description: description?.trim() || "",
        image: image || "",
        active: active !== undefined ? active : true,
        featured: featured !== undefined ? !!featured : false,
        badge: badge || null,
      },
    });

    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image: category.image || "",
      active: category.active,
      featured: category.featured,
      badge: category.badge || "",
      updatedAt: category.updatedAt.toISOString(),
      familiesCount: 0,
      productsCount: 0,
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("POST /api/admin/categories error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `${error.message}\n${error.stack}`
            : String(error),
      },
      { status: 500 },
    );
  }
}
