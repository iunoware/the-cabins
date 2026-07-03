import Hero from "./(components)/Hero";
import ContactInfo from "./(components)/Form";
import ContactForm from "./(components)/ContactForm";
import Cta from "@/src/components/Cta";

export default function ContactPage() {
  return (
    <>
      <Hero title="Contact Us" currentPage="Contact" />
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <Cta
        title="Build With a Partner You Can Trust"
        description="Join 1,500+ clients who chose The Cabins for modular excellence across the UAE."
        buttonLabel="Contact Our Team"
        buttonHref="/contact"
      />
    </>
  );
}
