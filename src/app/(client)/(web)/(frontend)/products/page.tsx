import Hero from "./(components)/Hero";
import Products from "./(components)/Products";
import Cta from "@/src/components/Cta";

export default function ProductsPage() {
  return (
    <>
      <Hero title="Our Products" currentPage="Products" />;
      <Products />
      <Cta
        title="Need a Custom Solution?"
        description="We build cabins to your exact requirements. Tell us your brief and we'll engineer it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
