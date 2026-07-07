import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products, productFamilies } from "@/src/data/products";
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
  const paths: { familySlug: string; variantSlug: string }[] = [];
  productFamilies.forEach((family) => {
    family.variants.forEach((variant) => {
      paths.push({
        familySlug: family.slug,
        variantSlug: variant.slug,
      });
    });
  });
  return paths;
}

// 2. SEO-friendly metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { familySlug, variantSlug } = await params;
  const product = products.find((p) => p.familySlug === familySlug && p.slug === variantSlug);

  if (!product) {
    return {
      title: "Product Not Found | The Cabins",
      description: "The requested modular cabin product could not be found.",
    };
  }

  return {
    title: `${product.title} | Premium Modular Buildings | The Cabins`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | Premium Modular Buildings | The Cabins`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { familySlug, variantSlug } = await params;
  const product = products.find((p) => p.familySlug === familySlug && p.slug === variantSlug);

  if (!product) {
    notFound();
  }


  return (
    <div className="bg-white min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 flex flex-col gap-16 sm:gap-20 md:gap-24">
        {/* Breadcrumb + Gallery + Info Sidebar */}
        <section>
          <ProductHeaderShowcase product={product} />
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
                  {product.shortDescription}
                </p>
                <p>
                  {product.fullDescription}
                </p>
                <p>
                  Manufactured from high-grade structural steel and premium sandwich paneling, this unit is built to endure the extreme climatic changes of the Middle East region while providing maximum thermal insulation and energy efficiency. It is pre-certified to meet standard safety and structural guidelines, making it a reliable solution for immediate project kick-offs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <FeatureGrid features={product.features} />

        {/* Technical Specification Table */}
        <SpecificationTable specifications={product.specifications} />

        {/* Application Cards */}
        <ApplicationGrid applications={product.applications} />

        {/* FAQ Accordion */}
        <FAQAccordion faq={product.faq} />

        {/* Related Products Carousel/Grid */}
        <RelatedProducts currentProduct={product} />
      </main>
    </div>
  );
}
