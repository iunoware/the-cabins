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

// PUT /api/admin/categories/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const body = await request.json();
    const { name, description, image, active } = body;

    const category = await prisma.productCategory.findUnique({
      where: { id }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name || category.name);

    if (slug !== category.slug) {
      const existing = await prisma.productCategory.findUnique({
        where: { slug }
      });
      if (existing) {
        return NextResponse.json(
          { error: "Category with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.productCategory.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        slug,
        description: description !== undefined ? description.trim() : undefined,
        image: image !== undefined ? image : undefined,
        active: active !== undefined ? active : undefined
      }
    });

    // Count families and products
    const dbCategory = await prisma.productCategory.findUnique({
      where: { id: updated.id },
      include: {
        _count: {
          select: { families: true }
        },
        families: {
          select: {
            _count: {
              select: { variants: true }
            }
          }
        }
      }
    });

    const familiesCount = dbCategory?._count.families || 0;
    const productsCount = dbCategory?.families.reduce(
      (sum, fam) => sum + fam._count.variants,
      0
    ) || 0;

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      description: updated.description || "",
      image: updated.image || "",
      active: updated.active,
      updatedAt: updated.updatedAt.toISOString(),
      familiesCount,
      productsCount
    });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("PUT /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getRequiredCurrentUser();
    const { id } = await params;

    const category = await prisma.productCategory.findUnique({
      where: { id }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    }

    // Check if category has families
    const familiesCount = await prisma.productFamily.count({
      where: { categoryId: id }
    });

    if (familiesCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete category because it contains product families. Please delete the families first." },
        { status: 400 }
      );
    }

    await prisma.productCategory.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const authResponse = authErrorResponse(error);
    if (authResponse) return authResponse;

    console.error("DELETE /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) },
      { status: 500 }
    );
  }
}
