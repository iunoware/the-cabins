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

// GET single product family
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const fam = await prisma.productFamily.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        _count: {
          select: { variants: true }
        }
      }
    });

    if (!fam) {
      return NextResponse.json(
        { error: "Product family not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
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
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("GET /api/admin/product-families/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// PATCH/PUT update product family
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const body = await request.json();
    const { categoryId, name, shortDescription, thumbnail, featured, popular, active, sortOrder } = body;

    const family = await prisma.productFamily.findUnique({
      where: { id }
    });

    if (!family) {
      return NextResponse.json(
        { error: "Product family not found." },
        { status: 404 }
      );
    }

    // Validate category exists if categoryId is updated
    if (categoryId && categoryId !== family.categoryId) {
      const category = await prisma.productCategory.findUnique({
        where: { id: categoryId }
      });
      if (!category) {
        return NextResponse.json(
          { error: "Parent category not found." },
          { status: 400 }
        );
      }
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name || family.name);

    if (slug !== family.slug) {
      const existing = await prisma.productFamily.findUnique({
        where: { slug }
      });
      if (existing) {
        return NextResponse.json(
          { error: "Product family with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.productFamily.update({
      where: { id },
      data: {
        categoryId: categoryId !== undefined ? categoryId : undefined,
        name: name !== undefined ? name.trim() : undefined,
        slug,
        shortDescription: shortDescription !== undefined ? shortDescription.trim() : undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        featured: featured !== undefined ? !!featured : undefined,
        popular: popular !== undefined ? !!popular : undefined,
        active: active !== undefined ? !!active : undefined,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : undefined
      },
      include: {
        category: {
          select: { name: true, slug: true }
        },
        _count: {
          select: { variants: true }
        }
      }
    });

    return NextResponse.json({
      id: updated.id,
      categoryId: updated.categoryId,
      name: updated.name,
      slug: updated.slug,
      shortDescription: updated.shortDescription,
      thumbnail: updated.thumbnail,
      active: updated.active,
      featured: updated.featured,
      popular: updated.popular,
      sortOrder: updated.sortOrder,
      updatedAt: updated.updatedAt.toISOString(),
      productsCount: updated._count.variants,
      categoryName: updated.category.name,
      categorySlug: updated.category.slug
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("PATCH /api/admin/product-families/[id] error:", error);
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

// DELETE product family
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const family = await prisma.productFamily.findUnique({
      where: { id }
    });

    if (!family) {
      return NextResponse.json(
        { error: "Product family not found." },
        { status: 404 }
      );
    }

    // Prevent deletion if variants (products) exist
    const variantsCount = await prisma.productVariant.count({
      where: { familyId: id }
    });

    if (variantsCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete product family because it contains product variants. Please delete the variants first." },
        { status: 400 }
      );
    }

    await prisma.productFamily.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("DELETE /api/admin/product-families/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}
