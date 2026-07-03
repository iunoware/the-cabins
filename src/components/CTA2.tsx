import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function CTA2() {
  return (
    <section className="bg-white px-5 py-6 pb-18 lg:mx-35 md:mx-25 sm:mx-10 mx-2">
      <div
        className="relative mx-auto flex min-h-60 max-w-372.5 items-center overflow-hidden rounded-4xl bg-cover bg-center px-8 py-4 md:min-h-123.5 md:px-24"
        style={{
          backgroundImage: "url('/images/products-hero.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-162.5">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Let&apos;s Build Your Next <br />
            Project Together
          </h2>

          <p className="mt-6 max-w-162.5 text-md font-medium leading-8 text-white/75 md:text-lg">
            From a single cabin to a full modular complex - our team delivers on time, on
            budget, and to the highest standard.
          </p>

          <a
            href="/contact"
            className="mt-9 inline-flex h-15 items-center gap-4 rounded-full bg-[#ED1B2F] px-10 text-md font-bold text-white transition hover:bg-[#d91629] md:px-11"
          >
            Start Your Project
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
