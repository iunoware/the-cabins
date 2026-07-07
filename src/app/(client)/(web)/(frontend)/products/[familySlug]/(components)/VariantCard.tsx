"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/src/data/products";
import { UserIcon } from "@heroicons/react/24/outline";
import { WhatsApp } from "@/src/components/Icons";

interface VariantCardProps {
  variant: Product;
  familySlug: string;
}

export default function VariantCard({ variant, familySlug }: VariantCardProps) {
  // Construct WhatsApp enquiry message for the variant
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in getting a quote/info for the product variant: ${variant.title} (${variant.size}).`
  );
  const whatsappUrl = `https://wa.me/971526856240?text=${whatsappMessage}`;

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      {/* Image Showcase */}
      <div className="relative flex h-48 items-center justify-center bg-[#eef0f4] shrink-0">
        {variant.badge && (
          <span className="absolute z-50 left-4 top-4 rounded-full bg-[#111217] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">
            {variant.badge}
          </span>
        )}

        <Image
          src={variant.images[0] || "/images/products-hero.jpg"}
          alt={variant.title}
          width={260}
          height={170}
          className="h-36 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          {/* Variant Name */}
          <h2 className="text-xl font-extrabold leading-tight text-[#111217]">
            {variant.title}
          </h2>

          {/* Short Description */}
          <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500 line-clamp-2">
            {variant.description}
          </p>

          {/* Specifications Row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
            <span className="text-[#e71f32] font-bold">⌗</span>
            <span>{variant.size}</span>

            <span className="text-[#e71f32] font-bold">
              <UserIcon className="h-4 w-4" />
            </span>
            <span>{variant.capacity}</span>
          </div>

          {/* Feature Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5 min-h-7">
            {variant.features.slice(0, 3).map((feat, i) => (
              <span
                key={i}
                className="inline-block rounded-full bg-gray-50 border border-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500"
              >
                {feat.title}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons & Pricing Footer */}
        <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col gap-3">
          {/* Pricing Info */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase text-gray-400">Starting Price</span>
            <p className="whitespace-nowrap text-base font-black text-[#111217]">
              <span className="text-[#e71f32] mr-1">→</span> {variant.price}
            </p>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Link
              href={`/products/${familySlug}/${variant.slug}`}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-gray-800 font-extrabold text-xs border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-center cursor-pointer"
            >
              <span>View Details</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#E71F32] hover:bg-[#ff2d35] text-white font-extrabold text-xs transition-all duration-300 text-center cursor-pointer"
            >
              <WhatsApp className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
