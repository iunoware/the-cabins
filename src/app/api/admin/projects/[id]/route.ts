// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import prisma from "@/src/db/prisma";
// import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

// type RouteProps = {
//   params: Promise<{ id: string }>;
// };

// export async function GET(_: Request, { params }: RouteProps) {
//   try {
//     const { id } = await params;

//     const project = await prisma.project.findUnique({
//       where: { id },
//       include: {
//         category: true,
//         images: {
//           orderBy: { sortOrder: "asc" },
//         },
//         testimonials: {
//           orderBy: { sortOrder: "asc" },
//         },
//       },
//     });

//     if (!project) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     return NextResponse.json({ project });
//   } catch {
//     return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
//   }
// }

// export async function PUT(request: Request, { params }: RouteProps) {
//   try {
//     await getRequiredCurrentUser();

//     const { id } = await params;
//     const body = await request.json();

//     await prisma.projectImage.deleteMany({
//       where: { projectId: id },
//     });

//     await prisma.projectTestimonial.deleteMany({
//       where: { projectId: id },
//     });

//     const project = await prisma.project.update({
//       where: { id },
//       data: {
//         title: body.title,
//         slug: body.slug,
//         description: body.description || null,
//         categoryId: body.categoryId,
//         city: body.city || null,
//         country: body.country || null,
//         status: body.status || null,
//         isFeatured: Boolean(body.isFeatured),
//         isActive: Boolean(body.isActive),
//         sortOrder: Number(body.sortOrder || 0),
//         metaTitle: body.metaTitle || null,
//         metaDescription: body.metaDescription || null,

//         images: {
//           create: body.images.map((image: any, index: number) => ({
//             imageUrl: image.imageUrl,
//             altText: image.altText || null,
//             isCover: index === 0,
//             sortOrder: index,
//           })),
//         },

//         testimonials: body.testimonial?.clientName
//           ? {
//               create: {
//                 clientName: body.testimonial.clientName,
//                 designation: body.testimonial.designation || null,
//                 companyName: body.testimonial.companyName || null,
//                 testimonial: body.testimonial.testimonial,
//                 rating: Number(body.testimonial.rating || 5),
//                 isActive: true,
//                 sortOrder: 0,
//               },
//             }
//           : undefined,
//       },
//     });

//     return NextResponse.json({ project });
//   } catch {
//     return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
//   }
// }

// export async function DELETE(_: Request, { params }: RouteProps) {
//   try {
//     const { id } = await params;

//     await prisma.project.delete({
//       where: { id },
//     });

//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";
import { saveProjectImages } from "../_utils";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        testimonials: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;
    const formData = await request.formData();

    const existingImages = JSON.parse(String(formData.get("existingImages") || "[]"));
    const newFiles = formData.getAll("images") as File[];
    const newImageUrls = await saveProjectImages(newFiles);

    const allImages = [...existingImages, ...newImageUrls];

    const title = String(formData.get("title") || "");
    const slug = String(formData.get("slug") || "");

    await prisma.projectImage.deleteMany({
      where: { projectId: id },
    });

    await prisma.projectTestimonial.deleteMany({
      where: { projectId: id },
    });

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description: String(formData.get("description") || "") || null,
        categoryId: String(formData.get("categoryId") || ""),
        city: String(formData.get("city") || "") || null,
        country: String(formData.get("country") || "") || null,
        status: String(formData.get("status") || "") || null,
        isFeatured: formData.get("isFeatured") === "true",
        isActive: formData.get("isActive") !== "false",
        sortOrder: Number(formData.get("sortOrder") || 0),
        metaTitle: String(formData.get("metaTitle") || "") || null,
        metaDescription: String(formData.get("metaDescription") || "") || null,

        images: {
          create: allImages.map((imageUrl: string, index: number) => ({
            imageUrl,
            altText: title,
            isCover: index === 0,
            sortOrder: index,
          })),
        },

        testimonials: {
          create: {
            clientName: String(formData.get("clientName") || ""),
            designation: String(formData.get("designation") || "") || null,
            companyName: String(formData.get("companyName") || "") || null,
            testimonial: String(formData.get("testimonial") || ""),
            rating: Number(formData.get("rating") || 5),
            isActive: true,
            sortOrder: 0,
          },
        },
      },
    });

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await getRequiredCurrentUser();

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
