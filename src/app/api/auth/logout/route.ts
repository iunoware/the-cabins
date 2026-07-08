import { NextResponse } from "next/server";
import { deleteSession } from "@/src/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  try {
    await deleteSession();

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.log("LOGOUT_ERROR", error);

    return NextResponse.json({ error: "Something went wrong " }, { status: 500 });
  }
}
