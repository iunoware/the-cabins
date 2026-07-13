import Hero from "./(components)/Hero";
import Products from "./(components)/Products";
import Cta from "@/src/components/Cta";
import { prisma } from "@/src/db/prisma";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const initialCategory = resolvedSearchParams.category || "";
  const dbCategories = await prisma.productCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" }
  });

  const dbFamilies = await prisma.productFamily.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      category: true,
      variants: {
        where: { active: true }
      }
    }
  });

  const formattedCategories = dbCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  const formattedFamilies = dbFamilies.map(fam => {
    // Get starting price from variants
    const prices = fam.variants
      .map(v => v.price ? Number(v.price) : null)
      .filter((p): p is number => p !== null);
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const startingPrice = minPrice ? `From AED ${minPrice.toLocaleString()}` : "Price on Enquiry";

    // Get sizes range
    const sizes = fam.variants.map(v => v.dimensions).filter(Boolean);
    const sizeRange = sizes.length > 0 ? sizes.join(" / ") : "Custom Sizes";

    // Get capacity range
    const capacities = fam.variants.map(v => v.capacity).filter(Boolean);
    const capacityRange = capacities.length > 0 ? capacities.join(" / ") : "Varies";

    return {
      id: fam.id,
      title: fam.name,
      slug: fam.slug,
      category: fam.category.name,
      description: fam.shortDescription,
      images: [fam.thumbnail],
      badge: fam.featured ? "Featured" : fam.popular ? "Popular" : undefined,
      sizeRange,
      capacityRange,
      startingPrice,
    };
  });

  return (
    <>
      <Hero title="Our Products" currentPage="Products" />
      <Products
        dbCategories={formattedCategories}
        dbFamilies={formattedFamilies}
        initialCategory={initialCategory}
      />
      <Cta
        title="Need a Custom Solution?"
        description="We build cabins to your exact requirements. Tell us your brief and we'll engineer it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
