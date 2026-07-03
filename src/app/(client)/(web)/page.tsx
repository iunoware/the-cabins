import Hero from "./(components)/Hero";
import Solutions from "./(components)/Solutions";
import About from "./(components)/About";
import WhyUs from "./(components)/WhyUs";
import HowWeWork from "./(components)/HowWeWork";
import RecentProjects from "./(components)/RecentProjects";
import ClientsMarquee from "./(components)/Clents";
import Testimonials from "./(components)/Testimonial";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <About />
      <WhyUs />
      <HowWeWork />
      <RecentProjects />
      <ClientsMarquee />
      <Testimonials />
      <Cta />
    </>
  );
}
