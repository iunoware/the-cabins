import Hero from "./(components)/Hero";
import Products from "./(components)/Products";
import Cta from "@/src/components/Cta";
import { prisma } from "@/src/db/prisma";

export default async function ProductsPage() {
  const dbCategories = await prisma.productCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" }
  });

  const formattedCategories = dbCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <>
      <Hero title="Our Products" currentPage="Products" />;
      <Products dbCategories={formattedCategories} />
      <Cta
        title="Need a Custom Solution?"
        description="We build cabins to your exact requirements. Tell us your brief and we'll engineer it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
