// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import prisma from "@/src/db/prisma";
// import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";

// export async function GET() {
//   try {
//     const projects = await prisma.project.findMany({
//       include: {
//         category: true,
//         images: {
//           orderBy: { sortOrder: "asc" },
//         },
//         testimonials: {
//           orderBy: { sortOrder: "asc" },
//         },
//       },
//       orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
//     });

//     return NextResponse.json({ projects });
//   } catch {
//     return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await getRequiredCurrentUser();

//     const body = await request.json();

//     const project = await prisma.project.create({
//       data: {
//         title: body.title,
//         slug: body.slug,
//         description: body.description || null,
//         categoryId: body.categoryId,
//         city: body.city || null,
//         country: body.country || null,
//         status: body.status || null,
//         isFeatured: Boolean(body.isFeatured),
//         isActive: Boolean(body.isActive ?? true),
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

//     return NextResponse.json({ project }, { status: 201 });
//   } catch {
//     return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";
import { getRequiredCurrentUser } from "@/src/lib/auth/current-user";
import { saveProjectImages } from "./_utils";

export async function GET() {
  try {
    await getRequiredCurrentUser();

    const projects = await prisma.project.findMany({
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        testimonials: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await getRequiredCurrentUser();

    const formData = await request.formData();

    const files = formData.getAll("images") as File[];
    const uploadedImageUrls = await saveProjectImages(files);

    const title = String(formData.get("title") || "");
    const slug = String(formData.get("slug") || "");

    const project = await prisma.project.create({
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
          create: uploadedImageUrls.map((imageUrl, index) => ({
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

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
