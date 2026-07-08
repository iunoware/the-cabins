import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET active product categories (Public)
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" }
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error("GET /api/products/categories error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
