"use client";

import { useEffect, useState } from "react";
import {
  PhoneIcon,
  DocumentTextIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    // <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    //   <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7A12.8 12.8 0 0 0 16 29c7.2 0 13-5.8 13-13S23.2 3 16 3Zm0 23.6c-2 0-3.9-.5-5.6-1.6l-.4-.2-4 .9.9-3.9-.3-.4A10.5 10.5 0 0 1 5.4 16C5.4 10.1 10.1 5.4 16 5.4S26.6 10.1 26.6 16 21.9 26.6 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.8.2-.2.3-.9 1-.1 1.2-.2.2-.4.2-.7.1-1.9-.8-3.2-2.8-3.4-3.1-.2-.3 0-.5.1-.6.2-.2.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
    // </svg>
    <svg
      className={className}
      fill="#ffffff"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>whatsapp</title>{" "}
        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>{" "}
      </g>
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
      <div className="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        <a
          href="https://wa.me/971526856240"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg transition hover:bg-green-600"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>

        <a
          href="tel:+971526856240"
          aria-label="Call us"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition hover:bg-neutral-800"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>

        <Link
          href="/contact"
          rel="noopener noreferrer"
          aria-label="View brochure"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg transition hover:bg-red-700"
        >
          <DocumentTextIcon className="h-5 w-5" />
        </Link>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`${showTopButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all duration-300 fixed bottom-6 right-2 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-lg hover:bg-neutral-800`}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
    </>
  );
}
