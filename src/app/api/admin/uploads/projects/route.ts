import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");

    await mkdir(uploadDir, { recursive: true });

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (!file.type.startsWith("image/")) {
          throw new Error("Only image files are allowed");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const extension = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${extension}`;

        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return `/uploads/projects/${fileName}`;
      }),
    );

    return NextResponse.json({ urls: uploadedFiles });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload project images" },
      { status: 500 },
    );
  }
}
