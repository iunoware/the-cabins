import Link from "next/link";

type PageHeroProps = {
  title: string;
  currentPage: string;
};

export default function Hero({ title, currentPage }: PageHeroProps) {
  return (
    <section
      className="relative flex h-[34vh] min-h-65 items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/products-hero.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <h1 className="text-5xl font-bold text-white md:text-6xl">{title}</h1>

        <div className="mt-6 flex items-center gap-3 text-base font-medium">
          <Link href="/" className="text-white/70 hover:text-white">
            Home
          </Link>

          <span className="text-red-600">›</span>

          <span className="text-white">{currentPage}</span>
        </div>
      </div>
    </section>
  );
}
