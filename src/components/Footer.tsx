import Link from "next/link";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const solutionLinks = [
  { label: "Portable Cabins", href: "/products" },
  { label: "Office Cabins", href: "/products" },
  { label: "Container Offices", href: "/products" },
  { label: "Custom Buildings", href: "/products" },
];

const socialLinks = [
  {
    label: "Instagram",
    // href: "https://www.instagram.com/thecabinsuae",
    href: "",
    // icon: "/icons/instagram.png",
    svg: <InstagramIcon className="h-8" />,
  },
  {
    label: "LinkedIn",
    // href: "https://www.linkedin.com/company/thecabinsuae",
    href: "",
    // icon: "/icons/linkedin.png",
    svg: <LinkedInIcon className="h-8" />,
  },
  {
    label: "Gmail",
    // href: "https://mail.google.com/mail/u/0/?fs=1&to=info@thecabins.ae&tf=cm",
    href: "",
    // icon: "/icons/gmail.png",
    svg: <GmailIcon className="h-8" />,
  },
  {
    label: "WhatsApp",
    // href: "https://wa.me/971526856240",
    href: "",
    // icon: "/icons/whatsapp.png",
    svg: <WhatsAppIcon className="h-8" />,
  },
];

type IconProps = {
  className?: string;
};

export default function Footer() {
  return (
    <footer className="bg-[#08090c] text-[#9b9ba6]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-4 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.25fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.jpeg"
                alt="The Cabins"
                width={115}
                height={55}
                className="h-auto w-25"
              />
            </Link>

            <p className="mt-8 max-w-90 text-sm leading-[1.55] tracking-wide text-[#9b9ba6]">
              Premium modular & cabin solutions across the United Arab Emirates. Designed,
              manufactured and delivered with uncompromising quality.
            </p>

            <div className="mt-7 flex items-center gap-1">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl transition hover:scale-105"
                >
                  {/* <Image
                    src={item.icon}
                    alt={item.label}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  /> */}
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Company
            </h3>

            <ul className="mt-9 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9b9ba6] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Solutions
            </h3>

            <ul className="mt-9 space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9b9ba6] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Get In Touch
            </h3>

            <div className="mt-9 space-y-3 text-sm">
              <div className="flex items-center gap-5">
                <MapPinIcon className="h-6 w-6 text-[#ef1d2f]" />
                <span>Industrial Area, Dubai, UAE</span>
              </div>

              <div className="flex items-center gap-5">
                <PhoneIcon className="h-6 w-6 text-[#ef1d2f]" />
                <span>+971 52 685 6240</span>
              </div>

              <div className="flex items-center gap-5">
                <EnvelopeIcon className="h-6 w-6 text-[#ef1d2f]" />
                <span>info@thecabins.ae</span>
              </div>
            </div>

            <form className="mt-9 flex max-w-105 gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="h-12 flex-1 rounded-2xl border border-white/15 bg-white/[0.07] px-6 text-md text-white outline-none placeholder:text-[#8f8f99] focus:border-[#ef1d2f]"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ef1d2f] text-white transition hover:bg-[#d9192a]"
              >
                <PaperAirplaneIcon className="h-7 w-7 -rotate-45" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-3 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © 2026{" "}
            {/* <a href="https://iunoware.com/" className="font-bold">
              Iunoware Pvt Ltd
            </a> */}{" "}
            Iunoware Pvt Ltd. All rights reserved.
          </p>

          <p>Premium Modular Solutions · Dubai · United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagramGradient" x1="6" y1="42" x2="42" y2="6">
          <stop stopColor="#FEDA75" />
          <stop offset="0.3" stopColor="#FA7E1E" />
          <stop offset="0.6" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="12" fill="url(#instagramGradient)" />

      <path
        d="M24 15.5C19.3 15.5 15.5 19.3 15.5 24C15.5 28.7 19.3 32.5 24 32.5C28.7 32.5 32.5 28.7 32.5 24C32.5 19.3 28.7 15.5 24 15.5ZM24 29.5C21 29.5 18.5 27 18.5 24C18.5 21 21 18.5 24 18.5C27 18.5 29.5 21 29.5 24C29.5 27 27 29.5 24 29.5Z"
        fill="white"
      />

      <path
        d="M33.2 14.8C34.2 14.8 35 15.6 35 16.6C35 17.6 34.2 18.4 33.2 18.4C32.2 18.4 31.4 17.6 31.4 16.6C31.4 15.6 32.2 14.8 33.2 14.8Z"
        fill="white"
      />

      <rect x="11" y="11" width="26" height="26" rx="8" stroke="white" strokeWidth="3" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#0A66C2" />

      <path
        d="M14.5 20H20V34H14.5V20ZM17.2 13C19 13 20.2 14.2 20.2 15.8C20.2 17.5 19 18.7 17.1 18.7C15.3 18.7 14.1 17.5 14.1 15.8C14.1 14.2 15.3 13 17.2 13ZM22.7 20H28V22C28.8 20.8 30.2 19.7 32.5 19.7C36.3 19.7 39 22.2 39 27.5V34H33.5V28.1C33.5 25.8 32.7 24.3 30.8 24.3C29.3 24.3 28.4 25.3 28 26.2C27.8 26.5 27.8 27 27.8 27.5V34H22.7V20Z"
        fill="white"
      />
    </svg>
  );
}

function GmailIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="white" />

      <path d="M8 16V35H15V21.5L24 28.5L33 21.5V35H40V16L24 28L8 16Z" fill="#EA4335" />

      <path
        d="M8 16L24 28L40 16V13C40 11.3 38 10.4 36.8 11.5L24 21L11.2 11.5C10 10.4 8 11.3 8 13V16Z"
        fill="#EA4335"
      />

      <path d="M8 16V35H15V21.5L8 16Z" fill="#FBBC04" />

      <path d="M40 16V35H33V21.5L40 16Z" fill="#34A853" />

      <path d="M24 28L15 21.5V35H33V21.5L24 28Z" fill="#4285F4" opacity="0.15" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="12" fill="#25D366" />

      <path
        d="M24 11C16.8 11 11 16.7 11 23.7C11 26.1 11.7 28.4 12.9 30.3L11 37L18 35.2C19.8 36.2 21.8 36.7 24 36.7C31.2 36.7 37 31 37 23.9C37 16.8 31.2 11 24 11Z"
        fill="white"
      />

      <path
        d="M31.2 27.9C30.9 27.7 28.9 26.8 28.6 26.7C28.2 26.6 27.9 26.5 27.6 26.9C27.3 27.3 26.5 28.2 26.2 28.5C26 28.8 25.7 28.8 25.3 28.6C24.9 28.4 23.7 28 22.3 26.8C21.2 25.8 20.4 24.7 20.2 24.3C20 23.9 20.2 23.7 20.4 23.5C20.6 23.3 20.8 23 21 22.8C21.2 22.5 21.3 22.3 21.4 22.1C21.5 21.8 21.5 21.6 21.4 21.4C21.3 21.2 20.5 19.2 20.1 18.4C19.8 17.6 19.5 17.7 19.2 17.7H18.4C18.1 17.7 17.6 17.8 17.2 18.2C16.8 18.6 15.7 19.6 15.7 21.6C15.7 23.6 17.2 25.5 17.4 25.8C17.6 26 20.3 30.3 24.6 32C28.9 33.7 28.9 33.1 29.7 33C30.5 32.9 32.1 32 32.4 31C32.7 30.1 32.7 29.2 32.6 29C32.4 28.7 31.7 28.4 31.2 27.9Z"
        fill="#25D366"
      />
    </svg>
  );
}
