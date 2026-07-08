import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/src/db/prisma";
import Hero from "../(components)/Hero";
import Breadcrumb from "./(components)/Breadcrumb";
import FamilyHero from "./(components)/FamilyHero";
import VariantCard from "./(components)/VariantCard";
import VariantComparison from "./(components)/VariantComparison";
import RelatedFamilies from "./(components)/RelatedFamilies";
import Cta from "@/src/components/Cta";

interface PageProps {
  params: Promise<{
    familySlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Static route generation for performance and SEO
export async function generateStaticParams() {
  const families = await prisma.productFamily.findMany({
    where: { active: true },
    select: { slug: true }
  });
  return families.map((family) => ({
    familySlug: family.slug,
  }));
}

// 2. SEO-friendly metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { familySlug } = await params;
  const family = await prisma.productFamily.findUnique({
    where: { slug: familySlug, active: true }
  });

  if (!family) {
    return {
      title: "Product Family Not Found | The Cabins",
      description: "The requested modular cabin product family could not be found.",
    };
  }

  return {
    title: `${family.name} | Premium Modular Buildings | The Cabins`,
    description: family.shortDescription,
    openGraph: {
      title: `${family.name} | Premium Modular Buildings | The Cabins`,
      description: family.shortDescription,
      images: [
        {
          url: family.thumbnail,
          width: 800,
          height: 600,
          alt: family.name,
        },
      ],
    },
  };
}

export default async function ProductFamilyPage({ params }: PageProps) {
  const { familySlug } = await params;
  const family = await prisma.productFamily.findUnique({
    where: { slug: familySlug, active: true },
    include: {
      category: true,
      variants: {
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        include: {
          features: { orderBy: { sortOrder: "asc" } },
          specifications: { orderBy: { sortOrder: "asc" } }
        }
      }
    }
  });

  if (!family) {
    notFound();
  }

  const prices = family.variants.map((v) => v.price ? Number(v.price) : null).filter((p): p is number => p !== null);
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const startingPrice = minPrice ? `From AED ${minPrice.toLocaleString()}` : "Price on Enquiry";

  const sizes = family.variants.map(v => v.dimensions).filter(Boolean);
  const sizeRange = sizes.length > 0 ? sizes.join(" / ") : "Custom Sizes";

  const capacities = family.variants.map(v => v.capacity).filter(Boolean);
  const capacityRange = capacities.length > 0 ? capacities.join(" / ") : "Varies";

  // Format data for presentation components
  const formattedFamily: any = {
    id: family.id,
    title: family.name,
    slug: family.slug,
    category: family.category.name,
    shortDescription: family.shortDescription,
    description: family.shortDescription,
    images: [family.thumbnail],
    startingPrice,
    sizeRange,
    capacityRange,
    variants: family.variants.map((v) => ({
      id: v.id,
      familySlug: family.slug,
      category: family.category.name,
      title: v.name,
      slug: v.slug,
      shortDescription: v.shortDescription || "",
      description: v.shortDescription || "",
      fullDescription: v.description || "",
      images: [v.thumbnail],
      size: v.dimensions || "Custom",
      capacity: v.capacity || "Varies",
      material: v.material || "Steel / Sandwich Panel",
      warranty: v.warranty || "1 Year",
      brochure: v.brochure || "",
      features: v.features.map(f => ({ title: f.title, description: f.description, icon: f.icon || "Sparkles" })),
      specifications: v.specifications.map(s => ({ label: s.parameter, value: s.value })),
      applications: [],
      faq: [],
      price: v.price ? `AED ${Number(v.price).toLocaleString()}` : "Price on Enquiry",
      badge: v.featured ? "Featured" : undefined
    }))
  };

  // Query related product families
  const relatedFams = await prisma.productFamily.findMany({
    where: {
      categoryId: family.categoryId,
      active: true,
      id: { not: family.id }
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
  if (relatedFams.length < 3) {
    const excludedIds = [family.id, ...relatedFams.map((rf) => rf.id)];
    const fallbackFams = await prisma.productFamily.findMany({
      where: {
        active: true,
        id: { notIn: excludedIds }
      },
      take: 3 - relatedFams.length,
      include: {
        category: true,
        variants: {
          where: { active: true }
        }
      }
    });
    relatedFams.push(...fallbackFams);
  }

  const formattedRelated = relatedFams.map((rf) => {
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
      {/* Page Header */}
      <Hero title={formattedFamily.title} currentPage="Products" />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 flex flex-col gap-16 sm:gap-20 md:gap-24">
        {/* Breadcrumb + Family Details Hero */}
        <section>
          <Breadcrumb category={formattedFamily.category} family={{ title: formattedFamily.title, slug: formattedFamily.slug }} />
          <FamilyHero family={formattedFamily} />
        </section>

        {/* Variants Section */}
        <section className="py-12 border-t border-gray-150">
          <div className="max-w-3xl mb-10">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
              Models
            </h2>
            <p className="text-3xl font-black text-[#111217] tracking-tight">
              Available Variants
            </p>
          </div>

          {/* Responsive Variants Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {formattedFamily.variants.map((v: any) => (
              <VariantCard key={v.id} variant={v} familySlug={formattedFamily.slug} />
            ))}
          </div>
        </section>

        {/* Optional Comparison Table */}
        {formattedFamily.variants.length > 1 && (
          <VariantComparison variants={formattedFamily.variants} familySlug={formattedFamily.slug} />
        )}

        {/* Related Families Section */}
        <RelatedFamilies relatedFamilies={formattedRelated} />
      </main>

      <Cta
        title="Need a Custom Solution?"
        description="We build cabins to your exact requirements. Tell us your brief and we'll engineer it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
