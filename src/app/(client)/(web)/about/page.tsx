import Hero from "./(components)/Hero";
import About from "./(components)/About";
import StatsSection from "./(components)/Stats";
import WhyUs from "./(components)/WhyUs";
import HowWeWork from "./(components)/HowWeWork";
import Cta from "@/components/Cta";

export default function AboutPage() {
  return (
    <>
      <Hero title="About Us" currentPage="About" />
      <About />
      <StatsSection />
      <WhyUs />
      <HowWeWork />
      <Cta
        title="Build With a Partner You Can Trust"
        description="Join 1,500+ clients who chose The Cabins for modular excellence across the UAE."
        buttonLabel="Contact Our Team"
        buttonHref="/contact"
      />
    </>
  );
}
