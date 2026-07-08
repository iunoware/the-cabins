import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/src/db/prisma";
import ProductHeaderShowcase from "./(components)/ProductHeaderShowcase";
import FeatureGrid from "./(components)/FeatureGrid";
import SpecificationTable from "./(components)/SpecificationTable";
import ApplicationGrid from "./(components)/ApplicationGrid";
import FAQAccordion from "./(components)/FAQAccordion";
import RelatedProducts from "./(components)/RelatedProducts";

interface PageProps {
  params: Promise<{
    familySlug: string;
    variantSlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Static route generation for performance and SEO
export async function generateStaticParams() {
  const variants = await prisma.productVariant.findMany({
    where: { active: true },
    include: {
      family: true
    }
  });
  return variants.map((variant) => ({
    familySlug: variant.family.slug,
    variantSlug: variant.slug,
  }));
}

// 2. SEO-friendly metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { familySlug, variantSlug } = await params;
  const product = await prisma.productVariant.findUnique({
    where: { slug: variantSlug, active: true }
  });

  if (!product) {
    return {
      title: "Product Not Found | The Cabins",
      description: "The requested modular cabin product could not be found.",
    };
  }

  return {
    title: `${product.name} | Premium Modular Buildings | The Cabins`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Premium Modular Buildings | The Cabins`,
      description: product.shortDescription,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { familySlug, variantSlug } = await params;
  const product = await prisma.productVariant.findUnique({
    where: { slug: variantSlug, active: true },
    include: {
      family: {
        include: { category: true }
      },
      images: { orderBy: { sortOrder: "asc" } },
      features: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      faqs: { orderBy: { sortOrder: "asc" } }
    }
  });

  if (!product) {
    notFound();
  }

  // Format data for presentation components
  const formattedProduct: any = {
    id: product.id,
    familySlug: product.family.slug,
    category: product.family.category.name,
    title: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription || "",
    description: product.shortDescription || "",
    fullDescription: product.description || "",
    price: product.price ? `AED ${Number(product.price).toLocaleString()}` : "Price on Enquiry",
    size: product.dimensions || "Custom",
    capacity: product.capacity || "Varies",
    material: product.material || "Steel / Sandwich Panel",
    warranty: product.warranty || "1 Year",
    brochure: product.brochure || "",
    model3d: product.model3d || "",
    images: product.images.length > 0 ? product.images.map(img => img.imageUrl) : [product.thumbnail],
    features: product.features.map(f => ({ title: f.title, description: f.description, icon: f.icon || "Sparkles" })),
    specifications: product.specifications.map(s => ({ label: s.parameter, value: s.value })),
    applications: product.applications.map(a => ({ title: a.title, icon: a.icon || "ArrowRight" })),
    faq: product.faqs.map(f => ({ question: f.question, answer: f.answer }))
  };

  // Query related product families in the same category
  const dbRelatedFamilies = await prisma.productFamily.findMany({
    where: {
      categoryId: product.family.categoryId,
      active: true,
      id: { not: product.familyId }
    },
    take: 3,
    include: {
      category: true,
      variants: {
        where: { active: true }
      }
    }
  });

  // Pad to 3 if less
  if (dbRelatedFamilies.length < 3) {
    const excludedIds = [product.familyId, ...dbRelatedFamilies.map((rf) => rf.id)];
    const fallbackFams = await prisma.productFamily.findMany({
      where: {
        active: true,
        id: { notIn: excludedIds }
      },
      take: 3 - dbRelatedFamilies.length,
      include: {
        category: true,
        variants: {
          where: { active: true }
        }
      }
    });
    dbRelatedFamilies.push(...fallbackFams);
  }

  const formattedRelated = dbRelatedFamilies.map((rf) => {
    const prices = rf.variants.map((v) => v.price ? Number(v.price) : null).filter((p): p is number => p !== null);
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const startingPrice = minPrice ? `From AED ${minPrice.toLocaleString()}` : "Price on Enquiry";

    return {
      id: rf.id,
      title: rf.name,
      slug: rf.slug,
      category: rf.category.name,
      description: rf.shortDescription,
      images: [rf.thumbnail],
      startingPrice
    };
  });

  return (
    <div className="bg-white min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 flex flex-col gap-16 sm:gap-20 md:gap-24">
        {/* Breadcrumb + Gallery + Info Sidebar */}
        <section>
          <ProductHeaderShowcase product={formattedProduct} />
        </section>

        {/* Detailed Description */}
        <section className="py-12 border-t border-gray-100">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
                Overview
              </h2>
              <p className="text-3xl font-black text-[#111217] tracking-tight">
                About This Product
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="text-gray-500 leading-[1.8] text-base sm:text-lg space-y-6">
                <p className="font-semibold text-gray-700">
                  {formattedProduct.shortDescription}
                </p>
                <p>
                  {formattedProduct.fullDescription}
                </p>
                <p>
                  Manufactured from high-grade structural steel and premium sandwich paneling, this unit is built to endure the extreme climatic changes of the Middle East region while providing maximum thermal insulation and energy efficiency. It is pre-certified to meet standard safety and structural guidelines, making it a reliable solution for immediate project kick-offs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <FeatureGrid features={formattedProduct.features} />

        {/* Technical Specification Table */}
        <SpecificationTable specifications={formattedProduct.specifications} />

        {/* Application Cards */}
        <ApplicationGrid applications={formattedProduct.applications} />

        {/* FAQ Accordion */}
        <FAQAccordion faq={formattedProduct.faq} />

        {/* Related Products Carousel/Grid */}
        <RelatedProducts relatedFamilies={formattedRelated} />
      </main>
    </div>
  );
}
