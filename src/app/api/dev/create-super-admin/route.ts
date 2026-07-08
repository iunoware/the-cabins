import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";
import { hashPassword } from "@/src/lib/auth/password";

export const runtime = "nodejs";

export async function GET() {
  try {
    const email = "thecabins@gmail.com";
    const password = "Thecabins@123";

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        name: "Super Admin",
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
        // deletedAt: null,
      },
      create: {
        name: "Super Admin",
        email,
        phone: null,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      message: "Super Admin ready",
      user,
      login: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("CREATE_SUPER_ADMIN_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to create Super Admin",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
