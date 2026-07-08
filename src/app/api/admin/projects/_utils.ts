import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { unlink } from "fs/promises";

export async function saveProjectImages(files: File[]) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");

  await mkdir(uploadDir, { recursive: true });

  return Promise.all(
    files.map(async (file) => {
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const extension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      return `/uploads/projects/${fileName}`;
    }),
  );
}

export async function deleteProjectImageFiles(imageUrls: string[]) {
  await Promise.all(
    imageUrls.map(async (imageUrl) => {
      try {
        if (!imageUrl.startsWith("/uploads/projects/")) return;

        const filePath = path.join(process.cwd(), "public", imageUrl);
        await unlink(filePath);
      } catch {
        // Ignore missing files
      }
    }),
  );
}
