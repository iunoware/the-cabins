"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, DocumentTextIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7A12.8 12.8 0 0 0 16 29c7.2 0 13-5.8 13-13S23.2 3 16 3Zm0 23.6c-2 0-3.9-.5-5.6-1.6l-.4-.2-4 .9.9-3.9-.3-.4A10.5 10.5 0 0 1 5.4 16C5.4 10.1 10.1 5.4 16 5.4S26.6 10.1 26.6 16 21.9 26.6 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.8.2-.2.3-.9 1-.1 1.2-.2.2-.4.2-.7.1-1.9-.8-3.2-2.8-3.4-3.1-.2-.3 0-.5.1-.6.2-.2.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
    </svg>
  );
}

export default function FloatingButtons() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        <a
          href="https://wa.me/971526856240"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg transition hover:bg-green-600"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>

        <a
          href="tel:+971526856240"
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition hover:bg-neutral-800"
        >
          <PhoneIcon className="h-6 w-6" />
        </a>

        <Link
          href="/contact"
          rel="noopener noreferrer"
          aria-label="View brochure"
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg transition hover:bg-red-700"
        >
          <DocumentTextIcon className="h-6 w-6" />
        </Link>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`${showTopButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all duration-300 fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg hover:bg-neutral-800`}
      >
        <ChevronUpIcon className="h-6 w-6" />
      </button>
    </>
  );
}
