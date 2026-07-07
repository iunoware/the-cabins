import { notFound } from "next/navigation";
import { Metadata } from "next";
import { productFamilies } from "@/src/data/products";
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
  return productFamilies.map((family) => ({
    familySlug: family.slug,
  }));
}

// 2. SEO-friendly metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { familySlug } = await params;
  const family = productFamilies.find((f) => f.slug === familySlug);

  if (!family) {
    return {
      title: "Product Family Not Found | The Cabins",
      description: "The requested modular cabin product family could not be found.",
    };
  }

  return {
    title: `${family.title} | Premium Modular Buildings | The Cabins`,
    description: family.shortDescription,
    openGraph: {
      title: `${family.title} | Premium Modular Buildings | The Cabins`,
      description: family.shortDescription,
      images: [
        {
          url: family.images[0],
          width: 800,
          height: 600,
          alt: family.title,
        },
      ],
    },
  };
}

export default async function ProductFamilyPage({ params }: PageProps) {
  const { familySlug } = await params;
  const family = productFamilies.find((f) => f.slug === familySlug);

  if (!family) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <Hero title={family.title} currentPage="Products" />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 flex flex-col gap-16 sm:gap-20 md:gap-24">
        {/* Breadcrumb + Family Details Hero */}
        <section>
          <Breadcrumb category={family.category} family={{ title: family.title, slug: family.slug }} />
          <FamilyHero family={family} />
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
            {family.variants.map((v) => (
              <VariantCard key={v.id} variant={v} familySlug={family.slug} />
            ))}
          </div>
        </section>

        {/* Optional Comparison Table */}
        {family.variants.length > 1 && (
          <VariantComparison variants={family.variants} familySlug={family.slug} />
        )}

        {/* Related Families Section */}
        <RelatedFamilies currentFamily={family} />
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
